import { Router } from "express";
import { prisma } from "../lib/prisma.js";
export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
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
});

productsRouter.post("/", async (req, res) => {
  const organizationId = req.orgId;
  const { name, sku, description, price, costPrice, stock, minStock } =
    req.body;
  if (!organizationId || !name || !sku || !costPrice || !price)
    return res.status(400).json({ error: "Missing required fields" });
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
  res.status(201).json(product);
});

productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const organizationId = req.orgId;

  if (!organizationId) {
    return res.status(400).json({ error: "Organization context required" });
  }

  const { name, sku, description, price, costPrice, stock, minStock } =
    req.body;

  try {
    // Use updateMany to ensure we only update if it belongs to THIS org

    const result = await prisma.product.updateMany({
      where: {
        id,
        organizationId,
      },
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
});

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const organizationId = req.orgId;

  if (!organizationId) {
    return res.status(400).json({ error: "Organization context required" });
  }

  try {
    const result = await prisma.product.deleteMany({
      where: {
        id,
        organizationId,
      },
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
});
