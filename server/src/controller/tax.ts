import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const listTaxRules = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });
  const { jurisdiction } = req.query as { jurisdiction?: string };
  const rules = await prisma.taxRule.findMany({
    where: {
      organizationId: orgId,
      ...(jurisdiction ? { jurisdiction } : {}),
    },
    orderBy: { effectiveFrom: "desc" },
  });
  res.json(rules);
};

export const createTaxRule = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });
  const { jurisdiction, type, rate, effectiveFrom, effectiveTo } =
    req.body ?? {};
  if (!jurisdiction || !type || typeof rate === "undefined" || !effectiveFrom) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const rule = await prisma.taxRule.create({
    data: {
      organizationId: orgId,
      jurisdiction,
      type,
      rate,
      effectiveFrom: new Date(effectiveFrom),
      effectiveTo: effectiveTo ? new Date(effectiveTo) : null,
    },
  });
  res.status(201).json(rule);
};

export const updateTaxRule = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Id required" });
  const { jurisdiction, type, rate, effectiveFrom, effectiveTo } =
    req.body ?? {};
  const rule = await prisma.taxRule.update({
    where: { id },
    data: {
      ...(jurisdiction ? { jurisdiction } : {}),
      ...(type ? { type } : {}),
      ...(typeof rate !== "undefined" ? { rate } : {}),
      ...(effectiveFrom ? { effectiveFrom: new Date(effectiveFrom) } : {}),
      ...(typeof effectiveTo !== "undefined"
        ? { effectiveTo: effectiveTo ? new Date(effectiveTo) : null }
        : {}),
    },
  });
  res.json(rule);
};

export const deleteTaxRule = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Id required" });
  const rule = await prisma.taxRule.findUnique({ where: { id } });
  if (!rule || rule.organizationId !== orgId) {
    return res.status(404).json({ error: "Not found" });
  }
  await prisma.taxRule.delete({ where: { id } });
  res.json({ ok: true });
};

export const seedDefaultTaxRule = async (req: Request, res: Response) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });
  const existing = await prisma.taxRule.findFirst({
    where: { organizationId: orgId, jurisdiction: "ALL", type: "VAT" },
  });
  if (existing) return res.json({ ok: true, id: existing.id });
  const rule = await prisma.taxRule.create({
    data: {
      organizationId: orgId,
      jurisdiction: "ALL",
      type: "VAT",
      rate: 0.075,
      effectiveFrom: new Date(),
      effectiveTo: null,
    },
  });
  res.status(201).json(rule);
};
