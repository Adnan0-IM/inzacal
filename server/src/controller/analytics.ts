import type { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

// Helper to derive date range from a period
function resolvePeriodRange(period?: string) {
  const now = new Date();
  const end = now;
  let start: Date;

  switch (period) {
    case "daily": {
      start = new Date(now);
      start.setHours(0, 0, 0, 0);
      break;
    }
    case "weekly": {
      const day = now.getDay(); // 0=Sun
      const diffToMonday = day === 0 ? -6 : 1 - day;
      start = new Date(now);
      start.setDate(now.getDate() + diffToMonday);
      start.setHours(0, 0, 0, 0);
      break;
    }
    case "monthly":
    default: {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      start.setHours(0, 0, 0, 0);
      break;
    }
  }
  return { start, end };
}

type SummaryParams = { period?: string; orgId?: string };

export async function analyticsSummary({ period, orgId }: SummaryParams) {
  const { start, end } = resolvePeriodRange(period);

  const saleWhere: any = {
    createdAt: { gte: start, lte: end },
    ...(orgId ? { organizationId: orgId } : {}),
  };
  const expenseWhere: any = {
    createdAt: { gte: start, lte: end },
    ...(orgId ? { organizationId: orgId } : {}),
  };

  const sales = await prisma.sale.findMany({
    where: saleWhere,
    include: { items: true },
  });
  const expenses = await prisma.expense.findMany({ where: expenseWhere });
  const taxSales = await prisma.sale.findMany({
    where: saleWhere,
    select: { taxAmount: true },
  });

  let totalRevenue = 0;
  let grossProfit = 0;
  for (const s of sales) {
    // Use persisted grossAmount if available, else compute from items
    const lineRevenue = (s as any).grossAmount
      ? Number((s as any).grossAmount)
      : s.items.reduce(
          (acc, it) => acc + Number(it.unitPrice) * it.quantity,
          0
        );
    const lineCost = s.items.reduce(
      (acc, it) => acc + Number(it.unitCost ?? 0) * it.quantity,
      0
    );
    totalRevenue += lineRevenue;
    grossProfit += lineRevenue - lineCost;
  }
  const expensesTotal = expenses.reduce(
    (
      a: number,
      e: {
        id: string;
        createdAt: Date;
        userId: string | null;
        organizationId: string;
        currency: string;
        description: string;
        category: string;
        amount: Prisma.Decimal;
        occurredOn: Date;
      }
    ) => a + Number(e.amount),
    0
  );

  const taxTotal = taxSales.reduce(
    (a: number, s: { taxAmount: Prisma.Decimal | null }) =>
      a + Number(s.taxAmount ?? 0),
    0
  );

  // low stock: stock < (minStock || 5)
  const products = await prisma.product.findMany({
    where: orgId ? { organizationId: orgId } : {},
    select: { stock: true, minStock: true },
  });
  const lowStockCount = products.filter(
    (p: { stock: number; minStock: number }) => p.stock < (p.minStock ?? 5)
  ).length;

  // Income tax estimate (does not alter persisted data)
  const incomeTaxRate = Number(process.env.INCOME_TAX_RATE ?? 0.3);
  const profitBeforeTax = grossProfit - expensesTotal;
  const estimatedIncomeTax = Math.max(0, profitBeforeTax * incomeTaxRate);
  const profitAfterTax = profitBeforeTax - estimatedIncomeTax;

  return {
    period: period || "monthly",
    totalSales: sales.length,
    totalRevenue, // excludes VAT
    grossProfit,
    taxTotal, // VAT collected
    profitBeforeTax,
    estimatedIncomeTax,
    profitAfterTax,
    expensesTotal,
    lowStockCount,
  };
}

export const topProducts = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });

  const {
    from,
    to,
    locationId,
    customerId,
    limit = "5",
  } = req.query as {
    from?: string;
    to?: string;
    locationId?: string;
    customerId?: string;
    limit?: string;
  };

  const whereSale: any = { organizationId: orgId };
  if (from || to) {
    whereSale.createdAt = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    };
  }
  if (locationId) whereSale.locationId = String(locationId);
  if (customerId) whereSale.customerId = String(customerId);

  // Get line items for matching sales
  const items = await prisma.saleLineItem.findMany({
    where: { sale: whereSale },
    select: {
      productId: true,
      quantity: true,
      unitPrice: true,
      product: { select: { name: true, sku: true } },
    },
  });

  // Aggregate quantities and revenue
  const agg = new Map<
    string,
    {
      productId: string;
      name: string;
      sku: string | null;
      qty: number;
      revenue: number;
    }
  >();
  for (const i of items) {
    const key = i.productId;
    const prev = agg.get(key) ?? {
      productId: i.productId,
      name: i.product.name,
      sku: i.product.sku ?? null,
      qty: 0,
      revenue: 0,
    };
    prev.qty += i.quantity;
    prev.revenue += Number(i.unitPrice) * i.quantity;
    agg.set(key, prev);
  }

  const sorted = Array.from(agg.values())
    .sort((a, b) => b.qty - a.qty || b.revenue - a.revenue)
    .slice(0, Number(limit));

  res.json(sorted);
};

export const locationPerformance = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });

  const {
    from,
    to,
    limit = "10",
  } = req.query as {
    from?: string;
    to?: string;
    limit?: string;
  };

  const whereSale: any = { organizationId: orgId };
  if (from || to) {
    whereSale.createdAt = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    };
  }

  // Fetch sales per branch (legacy: location) and their line items for COGS
  const sales = await prisma.sale.findMany({
    where: whereSale,
    select: { id: true, totalAmount: true, locationId: true, branchName: true },
  });

  const saleIds = sales.map(
    (s: {
      id: string;
      totalAmount: Prisma.Decimal;
      locationId: string | null;
    }) => s.id
  );
  const lineItems = saleIds.length
    ? await prisma.saleLineItem.findMany({
        where: { saleId: { in: saleIds } },
        select: { saleId: true, quantity: true, unitCost: true },
      })
    : [];

  // Aggregate totals per branch (or legacy locationId)
  const perf = new Map<
    string,
    {
      locationId: string | null;
      branchName: string | null;
      revenue: number;
      salesCount: number;
      cogs: number;
    }
  >();

  for (const s of sales) {
    const key =
      s.branchName && s.branchName.trim()
        ? `branch:${s.branchName.trim()}`
        : s.locationId
          ? `loc:${s.locationId}`
          : "unassigned";
    const prev = perf.get(key) ?? {
      locationId: s.locationId ?? null,
      branchName: (s as any).branchName ? String((s as any).branchName) : null,
      revenue: 0,
      salesCount: 0,
      cogs: 0,
    };
    prev.revenue += Number(s.totalAmount ?? 0);
    prev.salesCount += 1;
    perf.set(key, prev);
  }

  const itemsBySale = new Map<
    string,
    { quantity: number; unitCost: number }[]
  >();
  for (const li of lineItems) {
    const arr = itemsBySale.get(li.saleId) ?? [];
    arr.push({ quantity: li.quantity, unitCost: Number(li.unitCost ?? 0) });
    itemsBySale.set(li.saleId, arr);
  }

  for (const s of sales) {
    const key =
      s.branchName && s.branchName.trim()
        ? `branch:${s.branchName.trim()}`
        : s.locationId
          ? `loc:${s.locationId}`
          : "unassigned";
    const entry = perf.get(key);
    if (!entry) continue;
    const lis = itemsBySale.get(s.id) ?? [];
    for (const li of lis) {
      entry.cogs += li.unitCost * li.quantity;
    }
  }

  // Attach location names for legacy entries (when branchName isn't present)
  const legacyLocationIds = Array.from(perf.values())
    .map((x) => x.locationId)
    .filter(Boolean) as string[];
  const uniqueLegacyLocationIds = Array.from(new Set(legacyLocationIds));
  const locations = uniqueLegacyLocationIds.length
    ? await prisma.location.findMany({
        where: { id: { in: uniqueLegacyLocationIds } },
        select: { id: true, name: true },
      })
    : [];
  const nameById = new Map(
    locations.map((l: { name: string; id: string }) => [l.id, l.name])
  );

  const result = Array.from(perf.values())
    .map((x) => ({
      locationId: x.locationId,
      locationName: x.branchName?.trim()
        ? x.branchName.trim()
        : x.locationId
          ? (nameById.get(x.locationId) ?? "Unknown")
          : "Unassigned",
      revenue: x.revenue,
      salesCount: x.salesCount,
      cogs: x.cogs,
      grossProfit: x.revenue - x.cogs,
    }))
    .sort((a, b) => b.grossProfit - a.grossProfit || b.revenue - a.revenue)
    .slice(0, Number(limit));

  res.json(result);
};

export const customerPerformance = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });

  const {
    from,
    to,
    limit = "10",
  } = req.query as {
    from?: string;
    to?: string;
    limit?: string;
  };

  const whereSale: any = { organizationId: orgId };
  if (from || to) {
    whereSale.createdAt = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    };
  }

  // Fetch sales with customer and totals
  const sales = await prisma.sale.findMany({
    where: whereSale,
    select: {
      id: true,
      totalAmount: true,
      customerId: true,
      customer: {
        select: {
          id: true,
          name: true,
          city: true,
          state: true,
          lga: true,
          country: true,
        },
      },
    },
  });

  const saleIds = sales.map(
    (s: {
      id: string;
      totalAmount: Prisma.Decimal;
      customerId: string | null;
      customer: {
        name: string;
        id: string;
        city: string | null;
        state: string | null;
        lga: string | null;
        country: string | null;
      } | null;
    }) => s.id
  );
  const lineItems = saleIds.length
    ? await prisma.saleLineItem.findMany({
        where: { saleId: { in: saleIds } },
        select: { saleId: true, quantity: true, unitCost: true },
      })
    : [];

  // Aggregate by customer
  const perf = new Map<
    string,
    {
      customerId: string | null;
      customerName: string;
      city?: string | null;
      state?: string | null;
      lga?: string | null;
      country?: string | null;
      revenue: number;
      salesCount: number;
      cogs: number;
    }
  >();

  for (const s of sales) {
    const key = s.customerId ?? "unassigned";
    const prev = perf.get(key) ?? {
      customerId: s.customerId ?? null,
      customerName: s.customer?.name ?? "Unassigned",
      city: s.customer?.city ?? null,
      state: s.customer?.state ?? null,
      lga: s.customer?.lga ?? null,
      country: s.customer?.country ?? null,
      revenue: 0,
      salesCount: 0,
      cogs: 0,
    };
    prev.revenue += Number(s.totalAmount ?? 0);
    prev.salesCount += 1;
    perf.set(key, prev);
  }

  const itemsBySale = new Map<
    string,
    { quantity: number; unitCost: number }[]
  >();
  for (const li of lineItems) {
    const arr = itemsBySale.get(li.saleId) ?? [];
    arr.push({ quantity: li.quantity, unitCost: Number(li.unitCost ?? 0) });
    itemsBySale.set(li.saleId, arr);
  }

  for (const s of sales) {
    const key = s.customerId ?? "unassigned";
    const entry = perf.get(key);
    if (!entry) continue;
    const lis = itemsBySale.get(s.id) ?? [];
    for (const li of lis) {
      entry.cogs += li.unitCost * li.quantity;
    }
  }

  const result = Array.from(perf.values())
    .map((x) => ({
      customerId: x.customerId,
      customerName: x.customerName,
      city: x.city,
      state: x.state,
      lga: x.lga,
      country: x.country,
      revenue: x.revenue,
      salesCount: x.salesCount,
      cogs: x.cogs,
      grossProfit: x.revenue - x.cogs,
    }))
    .sort((a, b) => b.grossProfit - a.grossProfit || b.revenue - a.revenue)
    .slice(0, Number(limit));

  res.json(result);
};
