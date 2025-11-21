/*
  Warnings:

  - You are about to drop the column `address` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `fiscalYearStart` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `taxId` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organization" DROP COLUMN "address",
DROP COLUMN "currency",
DROP COLUMN "fiscalYearStart",
DROP COLUMN "industry",
DROP COLUMN "phone",
DROP COLUMN "taxId",
DROP COLUMN "timezone",
DROP COLUMN "website";
