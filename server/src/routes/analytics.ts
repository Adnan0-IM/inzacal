import { Router } from "express";
import {
  analyticsSummary,
  topProducts,
  locationPerformance,
  customerPerformance,
} from "../controller/analytics.js";

export const analyticsRouter = Router();

// Summary with period
analyticsRouter.get("/summary", async (req, res) => {
  const period = (req.query.period as string)?.toLowerCase();
  try {
    const data = await analyticsSummary({ period, orgId: req.orgId });
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// NEW: top-products with filters
analyticsRouter.get("/top-products", topProducts);

// NEW: location-performance with filters
analyticsRouter.get("/location-performance", locationPerformance);

// NEW: customer-performance with filters
analyticsRouter.get("/customer-performance", customerPerformance);
