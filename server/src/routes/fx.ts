import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import axios from "axios";

export const fxRouter = Router();

fxRouter.post("/refresh", async (_req, res) => {
  const base = process.env.FX_API_BASE ?? "NGN";
  const url = `${process.env.FX_API_URL}latest?access_key=${process.env.FX_API_KEY}&base=${base}`;
  const r = await axios.get(url);
  if (r.status !== 200) return res.status(500).json({ error: "FX fetch failed" });
  const data = r.data;
  const entries = Object.entries(data.rates ?? {});
  const now = new Date();
  await prisma.$transaction(
    entries
      .slice(0, 40)
      .map(([quote, rate]) =>
        prisma.fxRate.create({
          data: { base, quote, rate: Number(rate), fetchedAt: now },
        })
      )
  );
  res.json({ count: Math.min(entries.length, 40), base });
});
