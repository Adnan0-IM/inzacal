-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "lga" TEXT,
ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "lga" TEXT,
ADD COLUMN     "state" TEXT;
