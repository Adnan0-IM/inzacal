import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getLocations = async (req: Request, res: Response) => {
  const locations = await prisma.location.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(locations);
};

export const createLocation = async (req: Request, res: Response) => {
  const { name, address, lat, lng } = req.body ?? {};
  if (!name) return res.status(400).json({ error: "Name required" });
  const location = await prisma.location.create({
    data: { name, address, lat, lng },
  });
  res.status(201).json(location);
};
