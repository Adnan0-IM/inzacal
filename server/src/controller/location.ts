import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getLocations = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const locations = await prisma.location.findMany({
    where: { organizationId: req.orgId },
    orderBy: { createdAt: "desc" },
  });
  res.json(locations);
};

export const createLocation = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const { name, address, lat, lng, state, lga } = req.body ?? {};
  if (!name) return res.status(400).json({ error: "Name required" });
  const data: any = { name, address, lat, lng, organizationId: req.orgId };
  if (typeof state !== "undefined") data.state = state;
  if (typeof lga !== "undefined") data.lga = lga;
  const location = await prisma.location.create({ data });
  res.status(201).json(location);
};
