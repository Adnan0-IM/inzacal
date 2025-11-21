-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "fiscalYearStart" INTEGER,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "taxId" TEXT,
ADD COLUMN     "timezone" TEXT DEFAULT 'UTC',
ADD COLUMN     "website" TEXT;
