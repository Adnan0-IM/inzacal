import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL
const adapter = new PrismaPg({ connectionString })
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
   adapter
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export async function initDB(retries = 5) {
  // Simple connection check
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}
