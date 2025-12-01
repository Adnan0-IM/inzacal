/*
  Warnings:

  - You are about to drop the column `status` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `TaxRule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "TaxRule" ADD COLUMN     "organizationId" TEXT NOT NULL,
ALTER COLUMN "effectiveTo" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Sale_organizationId_createdAt_idx" ON "Sale"("organizationId", "createdAt");
