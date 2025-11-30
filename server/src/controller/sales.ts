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
  const { items } = req.body;

  if (!organizationId || !userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "No items in sale" });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;

      // Keep computed sale item rows and a product map with costPrice
      const saleItemsData: {
        productId: string;
        quantity: number;
        unitPrice: number;
      }[] = [];
      const productMap: Record<string, { costPrice: number }> = {};

      for (const item of items) {
        const { productId, quantity } = item;

        const product = await tx.product.findUnique({
          where: { id: productId },
        });
        if (!product) throw new Error(`Product ${productId} not found`);

        if (product.organizationId !== organizationId) {
          throw new Error(
            `Product ${product.name} does not belong to your organization`
          );
        }
        if (product.stock < quantity) {
          throw new Error(
            `Insufficient stock for ${product.name}. Available: ${product.stock}`
          );
        }

        const unitPrice = Number(product.price);
        totalAmount += unitPrice * quantity;

        saleItemsData.push({ productId, quantity, unitPrice });
        productMap[productId] = { costPrice: Number(product.costPrice ?? 0) };

        await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: quantity } },
        });
      }

      const sale = await tx.sale.create({
        data: {
          organizationId,
          userId,
          totalAmount,
          items: { create: saleItemsData }, // existing Sale.items
        },
        include: { items: true },
      });

      // Create SaleLineItem snapshots using computed unitPrice and product.costPrice
      await tx.saleLineItem.createMany({
        data: saleItemsData.map((li) => ({
          saleId: sale.id,
          productId: li.productId,
          quantity: li.quantity,
          unitPrice: li.unitPrice, // use computed price
          unitCost: productMap[li.productId]?.costPrice ?? 0, // use product cost snapshot
        })),
      });

      return sale;
    });

    res.status(201).json(result);
  } catch (error: any) {
    console.error("Sale failed:", error);
    res.status(400).json({ error: error.message || "Transaction failed" });
  }
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
      lowStock: lowStock.map((p) => ({
        id: p.id,
        name: p.name,
        stock: p.stock,
        minStock: p.minStock,
        qty: p.stock, // convenience
      })),
    });
  } catch (error) {
    console.error("Summary error:", error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};
