import { Router } from "express";
import {
  createCustomers,
  getCustomer,
  getCustomers,
} from "../controller/cutomers.js";
const customersRouter = Router();

customersRouter.get("/", getCustomers);

customersRouter.get("/:id", getCustomer);

customersRouter.post("/", createCustomers);
export { customersRouter };

