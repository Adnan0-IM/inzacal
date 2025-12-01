import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import PDFDocument from "pdfkit";
import fs from "fs";

export const reportsRouter = Router();

function periodSince(period: "weekly" | "monthly" | "quarterly" | "yearly") {
  const now = new Date();
  const ms =
    period === "weekly"
      ? 7 * 864e5
      : period === "monthly"
        ? 30 * 864e5
        : period === "quarterly"
          ? 90 * 864e5
          : 365 * 864e5;
  return new Date(now.getTime() - ms);
}

reportsRouter.get("/sales.csv", async (req, res) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });

  const { period = "monthly" } = req.query as {
    period?: "weekly" | "monthly" | "quarterly" | "yearly";
  };
  const now = new Date();
  const since =
    period === "weekly"
      ? new Date(now.getTime() - 7 * 864e5)
      : period === "monthly"
        ? new Date(now.getTime() - 30 * 864e5)
        : period === "quarterly"
          ? new Date(now.getTime() - 90 * 864e5)
          : new Date(now.getTime() - 365 * 864e5);

  const sales = await prisma.sale.findMany({
    where: { organizationId: orgId, createdAt: { gte: since } },
    select: {
      id: true,
      createdAt: true,
      totalAmount: true,
      customerId: true,
      locationId: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const lineItems = await prisma.saleLineItem.findMany({
    where: { saleId: { in: sales.map((s) => s.id) } },
    select: { saleId: true, quantity: true, unitCost: true },
  });

  const cogsBySale = new Map<string, number>();
  for (const li of lineItems) {
    cogsBySale.set(
      li.saleId,
      (cogsBySale.get(li.saleId) ?? 0) + Number(li.unitCost ?? 0) * li.quantity
    );
  }

  let csv = "Sale ID,Date,Customer ID,Location ID,Revenue,COGS,Gross Profit\n";
  for (const s of sales) {
    const rev = Number(s.totalAmount ?? 0);
    const cogs = cogsBySale.get(s.id) ?? 0;
    const gp = rev - cogs;
    csv += `${s.id},${s.createdAt.toISOString()},${s.customerId ?? ""},${s.locationId ?? ""},${rev},${cogs},${gp}\n`;
  }

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="sales-${period}.csv"`
  );
  res.send(csv);
});

// New: PDF export
reportsRouter.get("/sales.pdf", async (req, res) => {
  const orgId = req.orgId;
  if (!orgId) return res.status(401).json({ error: "Unauthorized" });

  const { period = "monthly", currency = "NGN" } = req.query as {
    period?: "weekly" | "monthly" | "quarterly" | "yearly";
    currency?: string;
  };
  const since = periodSince(period);

  const sales = await prisma.sale.findMany({
    where: { organizationId: orgId, createdAt: { gte: since } },
    select: {
      id: true,
      createdAt: true,
      totalAmount: true,
      customerId: true,
      locationId: true,
    },
    orderBy: { createdAt: "desc" },
  });
  const lineItems = await prisma.saleLineItem.findMany({
    where: { saleId: { in: sales.map((s) => s.id) } },
    select: { saleId: true, quantity: true, unitCost: true },
  });

  const cogsBySale = new Map<string, number>();
  for (const li of lineItems) {
    cogsBySale.set(
      li.saleId,
      (cogsBySale.get(li.saleId) ?? 0) + Number(li.unitCost ?? 0) * li.quantity
    );
  }

  const totalRevenue = sales.reduce(
    (sum, s) => sum + Number(s.totalAmount ?? 0),
    0
  );
  const totalCogs = sales.reduce(
    (sum, s) => sum + (cogsBySale.get(s.id) ?? 0),
    0
  );
  const grossProfit = totalRevenue - totalCogs;

  const fmt = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);

  const doc = new PDFDocument({ size: "A4", margin: 40 });
  const fontPath = process.env.PDF_FONT_PATH;
  if (fontPath && fs.existsSync(fontPath)) {
    doc.font(fontPath);
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="sales-${period}.pdf"`
  );

  doc.pipe(res);

  // Header
  doc.fontSize(18).text("Sales Report", { align: "left" });
  doc.moveDown(0.25);
  doc
    .fontSize(10)
    .fillColor("#666")
    .text(`Period: ${period}`, { continued: true })
    .text(`  From: ${since.toISOString().slice(0, 10)}`, { continued: true })
    .text(
      `  Generated: ${new Date().toISOString().slice(0, 19).replace("T", " ")}`
    );
  doc.fillColor("#000").moveDown();

  // Summary
  doc.fontSize(12).text("Summary", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(11);
  doc.text(`Total revenue: ${fmt(totalRevenue)}`);
  doc.text(`COGS: ${fmt(totalCogs)}`);
  doc.text(`Gross profit: ${fmt(grossProfit)}`);
  doc.text(`Sales count: ${sales.length}`);
  doc.moveDown();

  // Table header
  doc.fontSize(12).text("Sales", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(10);
  const colX = { id: 40, date: 140, cust: 250, loc: 360, rev: 440, gp: 520 };
  doc
    .text("ID", colX.id, doc.y, { continued: true })
    .text("Date", colX.date, doc.y, { continued: true })
    .text("Customer", colX.cust, doc.y, { continued: true })
    .text("Location", colX.loc, doc.y, { continued: true })
    .text("Revenue", colX.rev, doc.y, { continued: true })
    .text("Gross P.", colX.gp, doc.y);
  doc.moveDown(0.25);
  doc.moveTo(40, doc.y).lineTo(560, doc.y).stroke();
  doc.moveDown(0.25);

  // Fetch names to display customer/location
  const customerIds = Array.from(
    new Set(sales.map((s) => s.customerId).filter(Boolean))
  ) as string[];
  const locationIds = Array.from(
    new Set(sales.map((s) => s.locationId).filter(Boolean))
  ) as string[];
  const customers = customerIds.length
    ? await prisma.customer.findMany({
        where: { id: { in: customerIds } },
        select: { id: true, name: true },
      })
    : [];
  const locations = locationIds.length
    ? await prisma.location.findMany({
        where: { id: { in: locationIds } },
        select: { id: true, name: true },
      })
    : [];
  const cname = new Map(customers.map((c) => [c.id, c.name]));
  const lname = new Map(locations.map((l) => [l.id, l.name]));

  // Rows
  for (const s of sales) {
    const rev = Number(s.totalAmount ?? 0);
    const cogs = cogsBySale.get(s.id) ?? 0;
    const gp = rev - cogs;
    const y = doc.y;
    doc
      .text(s.id.slice(0, 8), colX.id, y, { continued: true })
      .text(s.createdAt.toISOString().slice(0, 10), colX.date, y, {
        continued: true,
      })
      .text(cname.get(s.customerId ?? "") ?? "", colX.cust, y, {
        continued: true,
      })
      .text(lname.get(s.locationId ?? "") ?? "", colX.loc, y, {
        continued: true,
      })
      .text(fmt(rev), colX.rev, y, { continued: true })
      .text(fmt(gp), colX.gp, y);
    doc.moveDown(0.2);
    if (doc.y > 760) {
      doc.addPage();
    }
  }

  doc.end();
});
