import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import PDFDocument from "pdfkit";
import fs from "fs";

export const reportsRouter = Router();

type SaleRow = Awaited<ReturnType<typeof prisma.sale.findMany>>[number];
type SaleLineItemRow = Awaited<
  ReturnType<typeof prisma.saleLineItem.findMany>
>[number];
type CustomerRow = Awaited<ReturnType<typeof prisma.customer.findMany>>[number];
type LocationRow = Awaited<ReturnType<typeof prisma.location.findMany>>[number];

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

/**
 * @openapi
 * /api/reports/sales.csv:
 *   get:
 *     tags: [Reports]
 *     summary: Export sales CSV for a period
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [weekly, monthly, quarterly, yearly]
 *     responses:
 *       200:
 *         description: CSV content
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 */
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

  let csv =
    "Sale ID,Date,Customer ID,Branch,Gross Sales,VAT,Net Sales,COGS,Gross Profit\n";
  for (const s of sales) {
    const gross = Number((s as any).grossAmount ?? 0);
    const vat = Number((s as any).taxAmount ?? 0);
    const netSales = gross; // excluding VAT
    const cogs = cogsBySale.get(s.id) ?? 0;
    const gp = netSales - cogs;
    csv += `${s.id},${s.createdAt.toISOString()},${s.customerId ?? ""},${(s as any).branchName ?? ""},${gross},${vat},${netSales},${cogs},${gp}\n`;
  }

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="sales-${period}.csv"`
  );
  res.send(csv);
});

// New: PDF export
/**
 * @openapi
 * /api/reports/sales.pdf:
 *   get:
 *     tags: [Reports]
 *     summary: Export sales PDF for a period
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [weekly, monthly, quarterly, yearly]
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *           default: NGN
 *     responses:
 *       200:
 *         description: PDF content
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
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
    (sum: number, s) => sum + Number((s as any).grossAmount ?? 0),
    0
  );
  const totalCogs = sales.reduce(
    (sum: number, s) => sum + (cogsBySale.get(s.id) ?? 0),
    0
  );
  const totalTax = sales.reduce(
    (sum: number, s) => sum + Number((s as any).taxAmount ?? 0),
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
  doc.text(`Gross sales (ex-VAT): ${fmt(totalRevenue)}`);
  doc.text(`COGS: ${fmt(totalCogs)}`);
  doc.text(`VAT collected: ${fmt(totalTax)}`);
  doc.text(`Gross profit: ${fmt(grossProfit)}`);
  doc.text(`Sales count: ${sales.length}`);
  doc.moveDown();

  // Table header
  doc.fontSize(12).text("Sales", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(10);
  const colX = {
    id: 40,
    date: 140,
    cust: 230,
    loc: 320,
    gross: 420,
    vat: 500,
    gp: 560,
  };
  doc
    .text("ID", colX.id, doc.y, { continued: true })
    .text("Date", colX.date, doc.y, { continued: true })
    .text("Customer", colX.cust, doc.y, { continued: true })
    .text("Branch", colX.loc, doc.y, { continued: true })
    .text("Gross", colX.gross, doc.y, { continued: true })
    .text("VAT", colX.vat, doc.y, { continued: true })
    .text("Gross P.", colX.gp, doc.y);
  doc.moveDown(0.25);
  doc.moveTo(40, doc.y).lineTo(560, doc.y).stroke();
  doc.moveDown(0.25);

  // Fetch names to display customer/location
  const customerIds = Array.from(
    new Set(sales.map((s) => s.customerId).filter(Boolean))
  ) as string[];
  const customers = customerIds.length
    ? await prisma.customer.findMany({
        where: { id: { in: customerIds } },
        select: { id: true, name: true },
      })
    : [];
  const cname = new Map<string, string>(customers.map((c) => [c.id, c.name]));

  // Rows
  for (const s of sales) {
    const gross = Number((s as any).grossAmount ?? 0);
    const cogs = cogsBySale.get(s.id) ?? 0;
    const vatAmt = Number((s as any).taxAmount ?? 0);
    const gp = gross - cogs;
    const y = doc.y;
    doc
      .text(s.id.slice(0, 8), colX.id, y, { continued: true })
      .text(s.createdAt.toISOString().slice(0, 10), colX.date, y, {
        continued: true,
      })
      .text(cname.get(s.customerId ?? "") ?? "", colX.cust, y, {
        continued: true,
      })
      .text(String((s as any).branchName ?? ""), colX.loc, y, {
        continued: true,
      })
      .text(fmt(gross), colX.gross, y, { continued: true })
      .text(fmt(vatAmt), colX.vat, y, { continued: true })
      .text(fmt(gp), colX.gp, y);
    doc.moveDown(0.2);
    if (doc.y > 760) {
      doc.addPage();
    }
  }

  doc.end();
});
