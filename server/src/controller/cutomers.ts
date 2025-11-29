import type { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export const getCustomers = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const customers = await prisma.customer.findMany({
    where: { sales: { some: { organizationId: req.orgId } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(customers);
};

export const getCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(401).json({ error: "Id is required" });
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const customers = await prisma.customer.findMany({
    where: { id, sales: { some: { organizationId: req.orgId } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(customers);
};

export const createCustomers = async (req: Request, res: Response) => {
  const { name, email, phone, city, country, lat, lng } = req.body ?? {};
  if (!name) return res.status(400).json({ error: "Name required" });
  const customer = await prisma.customer.create({
    data: { name, email, phone, city, country, lat, lng },
  });
  res.status(201).json(customer);
};
