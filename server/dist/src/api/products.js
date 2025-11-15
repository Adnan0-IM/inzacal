import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const productsRouter = Router();
productsRouter.get("/", async (req, res) => {
    const { organizationId } = req.query;
    const where = organizationId ? { organizationId } : {};
    const products = await prisma.product.findMany({ where, orderBy: { createdAt: "desc" } });
    res.json(products);
});
productsRouter.post("/", async (req, res) => {
    const { organizationId, name, sku, unitCost, unitPrice, quantity, lowStockThreshold } = req.body;
    if (!organizationId || !name || !sku || !unitCost || !unitPrice)
        return res.status(400).json({ error: "Missing required fields" });
    const product = await prisma.product.create({
        data: {
            organizationId,
            name,
            sku,
            unitCost,
            unitPrice,
            quantity: quantity || 0,
            lowStockThreshold: lowStockThreshold || 0
        }
    });
    res.status(201).json(product);
});
productsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, sku, unitCost, unitPrice, quantity, lowStockThreshold } = req.body;
    const product = await prisma.product.update({
        where: { id },
        data: { name, sku, unitCost, unitPrice, quantity, lowStockThreshold },
    });
    res.json(product);
});
productsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(204).end();
});
//# sourceMappingURL=products.js.map