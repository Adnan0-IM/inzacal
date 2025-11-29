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
  const userId = req.user?.id; // Assuming middleware attaches user
  const { items } = req.body; // Expecting [{ productId, quantity }]

  if (!organizationId || !userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "No items in sale" });
  }

  try {
    // We use a Transaction to ensure data integrity
    const result = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const saleItemsData = [];

      // Loop through every item in the cart
      for (const item of items) {
        const { productId, quantity } = item;

        // A. Fetch current product to check stock and price
        const product = await tx.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          throw new Error(`Product ${productId} not found`);
        }

        // B. Security: Ensure product belongs to this org
        if (product.organizationId !== organizationId) {
          throw new Error(
            `Product ${product.name} does not belong to your organization`,
          );
        }

        // C. Check Stock
        if (product.stock < quantity) {
          throw new Error(
            `Insufficient stock for ${product.name}. Available: ${product.stock}`,
          );
        }

        // D. Calculate Line Total
        const unitPrice = Number(product.price);
        totalAmount += unitPrice * quantity;

        // E. Prepare SaleItem data
        saleItemsData.push({
          productId,
          quantity,
          unitPrice,
        });

        // F. DEDUCT STOCK (The most important part!)
        await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: quantity } },
        });
      }

      // G. Create the Sale Record
      const sale = await tx.sale.create({
        data: {
          organizationId,
          userId,
          totalAmount,
          items: {
            create: saleItemsData,
          },
        },
        include: { items: true },
      });

      return sale;
    });

    // If we get here, everything worked!
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Sale failed:", error);
    // Send the specific error message (like "Insufficient stock") to the client
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
