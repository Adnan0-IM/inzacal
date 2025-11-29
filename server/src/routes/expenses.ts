import { Router } from "express";
import { createExpenses, getExpenses } from "../controller/expenses.js";

const expensesRouter = Router();

expensesRouter.get("/", getExpenses);

expensesRouter.post("/", createExpenses);

export { expensesRouter };

