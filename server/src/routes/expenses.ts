import { Router } from "express";
import { createExpenses, getExpenses } from "../controller/expenses.js";

const expensesRouter = Router();

/**
 * @openapi
 * /api/expenses:
 *   get:
 *     tags: [Expenses]
 *     summary: List expenses
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Array of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *   post:
 *     tags: [Expenses]
 *     summary: Create expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExpenseRequest'
 *     responses:
 *       201:
 *         description: Created expense
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 */
expensesRouter.get("/", getExpenses);

expensesRouter.post("/", createExpenses);

export { expensesRouter };
