import { Router } from "express";
import { analyticsSummary } from "../controller/analytics.js";

export const analyticsRouter = Router();

analyticsRouter.get("/summary", analyticsSummary);
