import type { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export const getSales = async (req: Request, res: Response) => {
  const organizationId = req.orgId;
  if (!organizationId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const sales = await prisma.sale.findMany({
      where: { organizationId },
      include: {
        items: {
          include: { product: true }, // Include product details for display
        },
        user: {
          select: { name: true, email: true }, // Show who sold it
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sales" });
  }
};

export const getSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(401).json({ error: "Id is required" });
  const organizationId = req.orgId;
  if (!organizationId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const sales = await prisma.sale.findMany({
      where: { id, organizationId },
      include: {
        items: {
          include: { product: true }, // Include product details for display
        },
        user: {
          select: { name: true, email: true }, // Show who sold it
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sales" });
  }
};
export const createSale = async (req: Request, res: Response) => {
  const organizationId = req.orgId;
  const userId = req.user?.id;
  const { items, customerId, locationId } = req.body;

  if (!organizationId || !userId)
    return res.status(401).json({ error: "Unauthorized" });
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: "No items" });

  // Compute total from items
  const totalAmount = items.reduce(
    (acc: number, it: any) => acc + Number(it.unitPrice) * Number(it.quantity),
    0
  );

  const sale = await prisma.sale.create({
    data: {
      organizationId,
      userId,
      customerId: customerId ?? null,
      locationId: locationId ?? null,
      totalAmount,
      items: {
        create: items.map((it: any) => ({
          productId: it.productId,
          quantity: Number(it.quantity),
          unitPrice: it.unitPrice, // Decimal-compatible
          unitCost: it.unitCost ?? null,
        })),
      },
    },
    include: { items: true },
  });

  res.status(201).json(sale);
};
export const salesSummary = async (req: Request, res: Response) => {
  const organizationId = req.orgId;
  const { period = "daily" } = req.query as {
    period?: "daily" | "weekly" | "monthly";
  };

  if (!organizationId) return res.status(401).json({ error: "Unauthorized" });

  const since =
    period === "weekly"
      ? new Date(Date.now() - 7 * 864e5)
      : period === "monthly"
        ? new Date(Date.now() - 30 * 864e5)
        : new Date(Date.now() - 1 * 864e5);

  try {
    const [agg, lowStock] = await Promise.all([
      prisma.sale.aggregate({
        where: {
          organizationId,
          createdAt: { gte: since },
        },
        _sum: { totalAmount: true },
        _count: { id: true },
      }),
      prisma.product.findMany({
        where: {
          organizationId,
          stock: { lte: 5 },
        },
        select: { id: true, name: true, stock: true, minStock: true },
        orderBy: { stock: "asc" },
        take: 5,
      }),
    ]);

    res.json({
      period,
      totalRevenue: Number(agg._sum.totalAmount || 0),
      salesCount: agg._count.id,
      lowStock: lowStock.map(
        (p: { id: string; name: string; stock: number; minStock: number }) => ({
          id: p.id,
          name: p.name,
          stock: p.stock,
          minStock: p.minStock,
          qty: p.stock, // convenience
        })
      ),
    });
  } catch (error) {
    console.error("Summary error:", error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};

export const getRecents = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });
  console.log("getRecents orgId:", orgId);
  const { limit = "10" } = req.query;
  const sales = await prisma.sale.findMany({
    where: { organizationId: orgId },
    select: { id: true, createdAt: true, totalAmount: true },
    orderBy: { createdAt: "desc" },
    take: Number(limit),
  });
  console.log("recent sales count:", sales.length);
  res.json(
    sales.map((s) => ({
      id: s.id,
      ref: s.id.slice(0, 8),
      date: s.createdAt,
      amount: Number(s.totalAmount ?? 0),
    }))
  );
};
