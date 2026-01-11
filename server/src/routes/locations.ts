import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { createLocation, getLocations } from "../controller/location.js";
const locationsRouter = Router();

/**
 * @openapi
 * /api/locations:
 *   get:
 *     tags: [Locations]
 *     summary: List locations for organization
 *     responses:
 *       200:
 *         description: Array of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *   post:
 *     tags: [Locations]
 *     summary: Create location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLocationRequest'
 *     responses:
 *       201:
 *         description: Created location
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
locationsRouter.get("/", getLocations);

locationsRouter.post("/", createLocation);

export { locationsRouter };
