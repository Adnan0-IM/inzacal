import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { createLocation, getLocations } from "../controller/location.js";
const locationsRouter = Router();

locationsRouter.get("/", getLocations);

locationsRouter.post("/", createLocation);

export { locationsRouter };
