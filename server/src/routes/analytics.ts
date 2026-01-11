import { Router } from "express";
import {
  analyticsSummary,
  topProducts,
  locationPerformance,
  customerPerformance,
} from "../controller/analytics.js";

export const analyticsRouter = Router();

// Summary with period
/**
 * @openapi
 * /api/analytics/summary:
 *   get:
 *     tags: [Analytics]
 *     summary: Analytics summary for a period
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         description: Period to summarize (default monthly)
 *     responses:
 *       200:
 *         description: Summary metrics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalyticsSummary'
 */
analyticsRouter.get("/summary", async (req, res) => {
  const period = (req.query.period as string)?.toLowerCase();
  try {
    const params = { period, ...(req.orgId ? { orgId: req.orgId } : {}) };
    const data = await analyticsSummary(params);
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// NEW: top-products with filters
/**
 * @openapi
 * /api/analytics/top-products:
 *   get:
 *     tags: [Analytics]
 *     summary: Top-selling products within date range and filters
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *       - in: query
 *         name: locationId
 *         schema:
 *           type: string
 *       - in: query
 *         name: customerId
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: Array of top products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TopProductEntry'
 */
analyticsRouter.get("/top-products", topProducts);

// NEW: location-performance with filters
/**
 * @openapi
 * /api/analytics/location-performance:
 *   get:
 *     tags: [Analytics]
 *     summary: Location performance within date range
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
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Array of location performance entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocationPerformanceEntry'
 */
analyticsRouter.get("/location-performance", locationPerformance);

// NEW: customer-performance with filters
/**
 * @openapi
 * /api/analytics/customer-performance:
 *   get:
 *     tags: [Analytics]
 *     summary: Customer performance within date range
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
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Array of customer performance entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerPerformanceEntry'
 */
analyticsRouter.get("/customer-performance", customerPerformance);
