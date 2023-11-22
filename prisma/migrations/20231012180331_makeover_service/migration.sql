/*
  Warnings:

  - You are about to drop the column `beautyServiceId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `beautyServiceId` on the `reviews_and_ratings` table. All the data in the column will be lost.
  - You are about to drop the `beauty_services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `makeoverServiceId` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `makeoverServiceId` to the `reviews_and_ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "beauty_services" DROP CONSTRAINT "beauty_services_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_beautyServiceId_fkey";

-- DropForeignKey
ALTER TABLE "reviews_and_ratings" DROP CONSTRAINT "reviews_and_ratings_beautyServiceId_fkey";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "beautyServiceId",
ADD COLUMN     "makeoverServiceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews_and_ratings" DROP COLUMN "beautyServiceId",
ADD COLUMN     "makeoverServiceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "beauty_services";

-- CreateTable
CREATE TABLE "makeover_services" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "information" JSONB NOT NULL,
    "additionalInformation" JSONB,
    "availibility" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "makeover_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "makeover_services" ADD CONSTRAINT "makeover_services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_and_ratings" ADD CONSTRAINT "reviews_and_ratings_makeoverServiceId_fkey" FOREIGN KEY ("makeoverServiceId") REFERENCES "makeover_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_makeoverServiceId_fkey" FOREIGN KEY ("makeoverServiceId") REFERENCES "makeover_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
