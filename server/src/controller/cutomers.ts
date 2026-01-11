import type { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export const getCustomers = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const customers = await prisma.customer.findMany({
    where: { organizationId: req.orgId },
    orderBy: { createdAt: "desc" },
  });
  res.json(customers);
};

export const getCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(401).json({ error: "Id is required" });
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const customer = await prisma.customer.findFirst({
    where: { id, organizationId: req.orgId },
  });
  if (!customer) return res.status(404).json({ error: "Not found" });
  res.json(customer);
};

export const createCustomers = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const { name, email, phone, city, country, state, lga, lat, lng } =
    req.body ?? {};
  if (!name) return res.status(400).json({ error: "Name required" });
  const data: any = {
    name,
    email,
    phone,
    city,
    country,
    lat,
    lng,
    organizationId: req.orgId,
  };
  if (typeof state !== "undefined") data.state = state;
  if (typeof lga !== "undefined") data.lga = lga;

  const customer = await prisma.customer.create({ data });
  res.status(201).json(customer);
};
