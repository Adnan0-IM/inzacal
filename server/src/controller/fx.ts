import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import axios from "axios";
import type { argv0 } from "process";

export const getExchangeRate = async (_req: Request, res: Response) => {
  const latest = await prisma.fxRate.findMany({
    orderBy: { fetchedAt: "desc" },
    take: 100,
  });
  res.json(latest);
};

export const refreshExchangeRate = async (req: Request, res: Response) => {
  const base = process.env.FX_API_BASE ?? "NGN";
  const url = `${process.env.FX_API_URL}latest?access_key=${process.env.FX_API_KEY}&base=${base}`;

  let data;

  try {
    const response = await axios.get(url);
    if (!response) return res.status(500).json({ error: "FX fetch failed" });
    data = await response.data;
  } catch (error) {
    console.log("Error", error);
    return res.json({ error: error });
  }

  const entries = Object.entries(data.rates ?? {});

  const created = [];

  for (const [quote, rate] of entries as [string, number][]) {
    const fx = await prisma.fxRate.create({ data: { base, quote, rate  } });
    created.push(fx);
  }

  res.json({ count: created.length });
};
