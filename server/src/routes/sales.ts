import { Router } from "express";
import {
  createSale,
  getSale,
  getSales,
  salesSummary,
  getRecents,
} from "../controller/sales.js";

export const salesRouter = Router();

/**
 * @openapi
 * /api/sales:
 *   get:
 *     tags: [Sales]
 *     summary: List sales
 *     responses:
 *       200:
 *         description: Array of sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *   post:
 *     tags: [Sales]
 *     summary: Create a sale
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               locationId:
 *                 type: string
 *               customerId:
 *                 type: string
 *                 nullable: true
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *                     costPrice:
 *                       type: number
 *             required: [locationId, items]
 *     responses:
 *       201:
 *         description: Created sale
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 */
salesRouter.get("/", getSales);

/**
 * @openapi
 * /api/sales/{id}:
 *   get:
 *     tags: [Sales]
 *     summary: Get sale by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sale
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Not found
 */
salesRouter.get("/:id", getSale);

salesRouter.post("/", createSale);

/**
 * @openapi
 * /api/sales/summary:
 *   get:
 *     tags: [Sales]
 *     summary: Sales summary metrics
 *     responses:
 *       200:
 *         description: Summary metrics including revenue, tax, profit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalyticsSummary'
 */
salesRouter.get("/summary", salesSummary);

/**
 * @openapi
 * /api/sales/recent:
 *   get:
 *     tags: [Sales]
 *     summary: Recently created sales
 *     responses:
 *       200:
 *         description: Array of recent sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 */
salesRouter.get("/recent", getRecents);
