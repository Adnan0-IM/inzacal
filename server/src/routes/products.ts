import { Router } from "express";
import {
  createProduct,
  deleteProducts,
  getProduct,
  getProducts,
  updateProduct,
} from "../controller/products.js";

export const productsRouter = Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProduct);

productsRouter.post("/", createProduct);

productsRouter.put("/:id", updateProduct);

productsRouter.delete("/:id", deleteProducts);
