import { Router } from "express";
import {
  createTaxRule,
  listTaxRules,
  updateTaxRule,
} from "../controller/tax.js";
import { deleteTaxRule, seedDefaultTaxRule } from "../controller/tax.js";

export const taxRouter = Router();

/**
 * @openapi
 * /api/tax:
 *   get:
 *     tags: [Tax]
 *     summary: List tax rules
 *     parameters:
 *       - in: query
 *         name: jurisdiction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of tax rules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaxRule'
 *   post:
 *     tags: [Tax]
 *     summary: Create tax rule
 *     description: |
 *       VAT is applied to taxable items only and excluded from revenue figures.
 *       Ensure jurisdiction values match your location data (e.g., LGA or State).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaxRuleRequest'
 *     responses:
 *       201:
 *         description: Created tax rule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaxRule'
 */
taxRouter.get("/", listTaxRules);
taxRouter.post("/", createTaxRule);
taxRouter.put("/:id", updateTaxRule);
/**
 * @openapi
 * /api/tax/{id}:
 *   delete:
 *     tags: [Tax]
 *     summary: Delete tax rule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 */
taxRouter.delete("/:id", deleteTaxRule);
/**
 * @openapi
 * /api/tax/seed-default:
 *   post:
 *     tags: [Tax]
 *     summary: Seed default VAT rule (7.5%)
 *     responses:
 *       201:
 *         description: Created default rule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaxRule'
 *       200:
 *         description: Default already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 id:
 *                   type: string
 */
taxRouter.post("/seed-default", seedDefaultTaxRule);
