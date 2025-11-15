import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
export const salesRouter = Router();
salesRouter.post("/", async (req, res) => {
    const { organizationId, items } = req.body;
    if (!organizationId || !items?.length)
        return res.status(400).json({ error: "Missing fields" });
    const products = await prisma.product.findMany({
        where: { id: { in: items.map((i) => i.productId) } },
    });
    const saleItems = items.map((i) => {
        const p = products.find((x) => x.id === i.productId);
        const unitCost = p.unitCost; // Prisma.Decimal
        const unitPrice = i.unitPrice !== undefined ? new Prisma.Decimal(i.unitPrice) : p.unitPrice;
        const lineTotal = unitPrice.mul(i.quantity);
        return {
            productId: p.id,
            quantity: i.quantity,
            unitCost,
            unitPrice,
            lineTotal,
        };
    });
    const costTotal = saleItems.reduce((acc, i) => acc.add(i.unitCost.mul(i.quantity)), new Prisma.Decimal(0));
    const total = saleItems.reduce((acc, i) => acc.add(i.lineTotal), new Prisma.Decimal(0));
    const profit = total.sub(costTotal);
    const sale = await prisma.$transaction(async (tx) => {
        const s = await tx.sale.create({
            data: {
                organizationId,
                total,
                costTotal,
                profit,
                items: { create: saleItems },
            },
            include: { items: true },
        });
        for (const i of saleItems) {
            await tx.product.update({
                where: { id: i.productId },
                data: { quantity: { decrement: i.quantity } },
            });
        }
        return s;
    });
    res.status(201).json(sale);
});
salesRouter.get("/summary", async (req, res) => {
    const { organizationId, period = "daily" } = req.query;
    const since = period === "weekly"
        ? new Date(Date.now() - 7 * 864e5)
        : period === "monthly"
            ? new Date(Date.now() - 30 * 864e5)
            : new Date(Date.now() - 1 * 864e5);
    const whereSale = {
        createdAt: { gte: since },
        ...(organizationId ? { organizationId } : {}),
    };
    const [agg, lowStock] = await Promise.all([
        prisma.sale.aggregate({
            where: whereSale,
            _sum: { total: true, profit: true },
            _count: true,
        }),
        prisma.product.findMany({
            where: {
                ...(organizationId ? { organizationId } : {}),
                // quantity <= lowStockThreshold
                // Prisma cannot compare two columns directly; emulate by a simple threshold for MVP:
                quantity: { lte: 5 },
            },
            orderBy: { quantity: "asc" },
            take: 10,
        }),
    ]);
    res.json({
        period,
        totalSales: agg._sum.total ?? 0,
        totalProfit: agg._sum.profit ?? 0,
        salesCount: agg._count,
        lowStock,
    });
});
//# sourceMappingURL=sales.js.map