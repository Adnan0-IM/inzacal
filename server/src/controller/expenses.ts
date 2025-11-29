import type { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export const getExpenses = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const { from, to } = req.query;
  const where: any = { organizationId: req.orgId };
  if (from && to)
    where.occurrdOn = {
      gte: new Date(String(from)),
      lte: new Date(String(to)),
    };
  const expenses = await prisma.expense.findMany({
    where,
    orderBy: { occurrdOn: "desc" },
  });
  res.json(expenses);
};

export const createExpenses = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const {
    description,
    category,
    amount,
    occurrdOn,
    currency = "NGN",
  } = req.body ?? {};
  if (!description || !category || !amount || !occurrdOn) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const expense = await prisma.expense.create({
    data: {
      description,
      category,
      amount,
      currency,
      occurrdOn: new Date(occurrdOn),
      userId: req.user?.id,
      organizationId: req.orgId,
    } as any, // add organizationId in schema if missing
  });
  res.status(201).json(expense);
};
