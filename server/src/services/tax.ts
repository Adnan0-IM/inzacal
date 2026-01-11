import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

type SaleItemInput = {
  productId: string;
  quantity: number;
  unitPrice: Prisma.Decimal | number;
};

export async function computeVatForSale(params: {
  organizationId: string;
  locationId: string;
  items: SaleItemInput[];
}): Promise<{
  grossAmount: Prisma.Decimal;
  taxableAmount: Prisma.Decimal;
  vatRate: Prisma.Decimal;
  vatAmount: Prisma.Decimal;
}> {
  const { organizationId, locationId, items } = params;

  // Load product tax flags
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, organizationId },
    select: { id: true, taxExempt: true },
  });
  const exempt = new Map(products.map((p) => [p.id, !!p.taxExempt]));

  // Compute gross and taxable amounts (Decimal math)
  let gross = new Prisma.Decimal(0);
  let taxable = new Prisma.Decimal(0);
  for (const it of items) {
    const price =
      it.unitPrice instanceof Prisma.Decimal
        ? it.unitPrice
        : new Prisma.Decimal(it.unitPrice);
    const qty = new Prisma.Decimal(it.quantity);
    const line = price.mul(qty);
    gross = gross.add(line);
    if (!exempt.get(it.productId)) {
      taxable = taxable.add(line);
    }
  }

  // Determine tax rate by location: prefer LGA, then state, else ALL, else default 0.075
  const loc = await prisma.location.findFirst({
    where: { id: locationId, organizationId },
    select: { lga: true, state: true },
  });
  const now = new Date();
  let rateDec = new Prisma.Decimal(0);
  if (loc) {
    const ruleLga = loc.lga
      ? await prisma.taxRule.findFirst({
          where: {
            organizationId,
            jurisdiction: String(loc.lga),
            effectiveFrom: { lte: now },
            OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
          },
          orderBy: { effectiveFrom: "desc" },
        })
      : null;
    const ruleState =
      !ruleLga && loc.state
        ? await prisma.taxRule.findFirst({
            where: {
              organizationId,
              jurisdiction: String(loc.state),
              effectiveFrom: { lte: now },
              OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
            },
            orderBy: { effectiveFrom: "desc" },
          })
        : null;
    const ruleAll =
      !ruleLga && !ruleState
        ? await prisma.taxRule.findFirst({
            where: {
              organizationId,
              jurisdiction: "ALL",
              effectiveFrom: { lte: now },
              OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
            },
            orderBy: { effectiveFrom: "desc" },
          })
        : null;
    const found = ruleLga ?? ruleState ?? ruleAll;
    if (found) rateDec = new Prisma.Decimal(found.rate as any);
  }
  if (rateDec.equals(0)) {
    // Default VAT 7.5%
    rateDec = new Prisma.Decimal(0.075);
  }

  const vatAmount = taxable.mul(rateDec);

  return {
    grossAmount: gross,
    taxableAmount: taxable,
    vatRate: rateDec,
    vatAmount,
  };
}
