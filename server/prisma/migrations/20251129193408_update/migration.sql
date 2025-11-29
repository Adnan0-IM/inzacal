/*
  Warnings:

  - You are about to drop the column `occurrdOn` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `occurredOn` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "occurrdOn",
ADD COLUMN     "occurredOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "organizationId" TEXT NOT NULL;
