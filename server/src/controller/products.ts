import type { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export const getProducts = async (req: Request, res: Response) => {
  const where = req.orgId ? { organizationId: req.orgId } : {};
  try {
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const where = req.orgId && id ? { organizationId: req.orgId, id } : {};
  try {
    const products = await prisma.product.findMany({
      where,
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const organizationId = req.orgId;
  const {
    name,
    sku,
    description,
    price,
    costPrice,
    stock,
    minStock,
    locationId,
  } = req.body ?? {};

  if (!organizationId || !name || !sku || !costPrice || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        organizationId,
        name,
        sku,
        description,
        price,
        costPrice,
        stock: stock || 0,
        minStock: minStock || 0,
      },
    });

    // If a locationId is provided, allocate the initial stock to that location
    if (locationId && (stock ?? 0) > 0) {
      await prisma.productStock.upsert({
        where: {
          productId_locationId: { productId: product.id, locationId },
        },
        update: {
          quantity: { increment: Number(stock) || 0 },
        },
        create: {
          productId: product.id,
          locationId,
          quantity: Number(stock) || 0,
        },
      });
    }

    return res.status(201).json(product);
  } catch (error) {
    console.error("Failed to create product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const organizationId = req.orgId;

  if (!organizationId) {
    return res.status(400).json({ error: "Organization context required" });
  }

  const { name, sku, description, price, costPrice, stock, minStock } =
    req.body;

  const where = req.orgId && id ? { organizationId, id } : {};
  try {
    const result = await prisma.product.updateMany({
      where,
      data: { name, sku, description, price, costPrice, stock, minStock },
    });

    if (result.count === 0) {
      return res
        .status(404)
        .json({ error: "Product not found or access denied" });
    }

    // updateMany doesn't return the object, so we fetch it or just return success
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};
export const deleteProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const organizationId = req.orgId;

  if (!organizationId) {
    return res.status(400).json({ error: "Organization context required" });
  }

  const where = req.orgId && id ? { organizationId, id } : {};
  try {
    const result = await prisma.product.deleteMany({
      where,
    });

    if (result.count === 0) {
      return res
        .status(404)
        .json({ error: "Product not found or access denied" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export const getLowStockProducts = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });
  const { limit = "10" } = req.query;
  const items = await prisma.product.findMany({
    where: {
      organizationId: orgId,
      stock: { lt: prisma.product.fields.minStock }, // fallback if not supported by client, do manual compare later
    },
    orderBy: [{ stock: "asc" }, { updatedAt: "desc" }],
    take: Number(limit),
    select: { id: true, name: true, stock: true, minStock: true },
  });

  // Prisma cannot compare two fields directly in where; use filter fallback
  const filtered = items.filter(
    (p: { name: string; id: string; stock: number; minStock: number }) =>
      p.stock < p.minStock
  );

  res.json(filtered);
};
