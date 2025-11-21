import { Router } from "express";
import { prisma } from "../lib/prisma.js";
export const analyticsRouter = Router();

analyticsRouter.get("/summary", async (req, res) => {
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
      (p) => (p.stock ?? 0) <= (p.minStock ?? 0)
    ).length;

    const totalProducts = await prisma.product.count({
      where: { organizationId },
    });

    res.json({
      totalRevenue: Number(sales._sum.totalAmount || 0),
      totalSales: sales._count.id || 0,
      lowStockCount,
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});
