import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getLocations = async (req: Request, res: Response) => {
  const locations = await prisma.location.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(locations);
};

export const createLocation = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const { name, address, lat, lng } = req.body ?? {};
  if (!name) return res.status(400).json({ error: "Name required" });
  const location = await prisma.location.create({
    data: { name, address, lat, lng, organizationId: req.orgId },
  });
  res.status(201).json(location);
};
