/*
  Warnings:

  - You are about to drop the column `lowStockThreshold` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitCost` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `costTotal` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `profit` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `lineTotal` on the `SaleItem` table. All the data in the column will be lost.
  - You are about to drop the column `unitCost` on the `SaleItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationId,sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_sku_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "lowStockThreshold",
DROP COLUMN "quantity",
DROP COLUMN "unitCost",
DROP COLUMN "unitPrice",
ADD COLUMN     "costPrice" DECIMAL(65,30),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "minStock" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "sku" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "costTotal",
DROP COLUMN "profit",
DROP COLUMN "total",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'completed',
ADD COLUMN     "totalAmount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SaleItem" DROP COLUMN "lineTotal",
DROP COLUMN "unitCost",
ALTER COLUMN "unitPrice" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "Product_organizationId_sku_key" ON "Product"("organizationId", "sku");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
