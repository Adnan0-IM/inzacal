import { Router } from "express";
import {
  createProduct,
  deleteProducts,
  getProduct,
  getProducts,
  updateProduct,
  getLowStockProducts,
} from "../controller/products.js";
import { prisma } from "../lib/prisma.js";

export const productsRouter = Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProduct);

productsRouter.post("/", createProduct);

productsRouter.put("/:id", updateProduct);

productsRouter.delete("/:id", deleteProducts);

productsRouter.get("/low-stock", getLowStockProducts);
