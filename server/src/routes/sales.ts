import { Router } from "express";
import {
  createSale,
  getSale,
  getSales,
  salesSummary,
  getRecents,
} from "../controller/sales.js";

export const salesRouter = Router();

salesRouter.get("/", getSales);

salesRouter.get("/:id", getSale);

salesRouter.post("/", createSale);

salesRouter.get("/summary", salesSummary);

salesRouter.get("/recent", getRecents);
