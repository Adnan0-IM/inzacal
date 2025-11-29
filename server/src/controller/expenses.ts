import type { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export const getExpenses = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const { from, to } = req.query;
  const where: any = { organizationId: req.orgId };
  if (from && to) {
    where.occurredOn = {
      gte: new Date(String(from)),
      lte: new Date(String(to)),
    };
  }
  const expenses = await prisma.expense.findMany({
    where,
    orderBy: { occurredOn: "desc" },
  });
  res.json(expenses);
};

export const createExpenses = async (req: Request, res: Response) => {
  if (!req.orgId) return res.status(401).json({ error: "Unauthorized" });
  const {
    description,
    category,
    amount,
    occurredOn,
    currency = "NGN",
  } = req.body ?? {};
  if (!description || !category || !amount || !occurredOn) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const expense = await prisma.expense.create({
    data: {
      description,
      category,
      amount,
      currency,
      occurredOn: new Date(occurredOn),
      organizationId: req.orgId,
      userId: req.user?.id,
    },
  });
  res.status(201).json(expense);
};
