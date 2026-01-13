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
 *               branchName:
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
 *             required: [branchName, items]
 *     responses:
 *       201:
 *         description: Created sale
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 */
salesRouter.get("/", getSales);

salesRouter.get("/summary", salesSummary);

salesRouter.get("/recent", getRecents);

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
salesRouter.post("/", createSale);

salesRouter.get("/:id", getSale);
