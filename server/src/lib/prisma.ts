import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    adapter,
    log: [
      { emit: "stdout", level: "warn" },
      { emit: "stdout", level: "error" },
    ],
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export async function initDB(retries = 5) {
  let delay = 500;
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      return;
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, delay));
      delay = Math.min(delay * 2, 5000);
    }
  }
}
