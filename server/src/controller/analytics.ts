import type { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
export const analyticsSummary = async (req: Request, res: Response) => {
  const organizationId = req.orgId;
  if (!organizationId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const sales = await prisma.sale.aggregate({
      where: { organizationId },
      _sum: { totalAmount: true },
      _count: { id: true },
    });

    // Prisma can't compare columns directly; compute in JS
    const lowStockProducts = await prisma.product.findMany({
      where: { organizationId },
      select: { id: true, stock: true, minStock: true },
    });
    const lowStockCount = lowStockProducts.filter(
      (p: { id: string; stock: number; minStock: number }) =>
        (p.stock ?? 0) <= (p.minStock ?? 0)
    ).length;

    const totalProducts = await prisma.product.count({
      where: { organizationId },
    });

    // Expenses total
    const expensesAgg = await prisma.expense.aggregate({
      where: { organizationId },
      _sum: { amount: true },
    });
    const expensesTotal = Number(expensesAgg._sum.amount ?? 0);

    // COGS from SaleLineItem (fallback to Product.costPrice)
    const lineItems = await prisma.saleLineItem.findMany({
      where: { sale: { organizationId } },
      select: {
        quantity: true,
        unitCost: true,
        product: { select: { costPrice: true } },
      },
    });
    let cogs = 0;
    for (const li of lineItems) {
      const cost = Number(li.unitCost ?? li.product.costPrice ?? 0);
      cogs += cost * li.quantity;
    }
    const revenue = Number(sales._sum.totalAmount ?? 0);
    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - expensesTotal;

    return res.json({
      totalRevenue: revenue,
      totalSales: sales._count.id,
      lowStockCount,
      totalProducts,
      grossProfit,
      netProfit,
      expensesTotal,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
