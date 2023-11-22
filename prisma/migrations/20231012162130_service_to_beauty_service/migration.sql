/*
  Warnings:

  - You are about to drop the column `serviceId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `reviews_and_ratings` table. All the data in the column will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `beautyServiceId` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beautyServiceId` to the `reviews_and_ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "reviews_and_ratings" DROP CONSTRAINT "reviews_and_ratings_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_categoryId_fkey";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "serviceId",
ADD COLUMN     "beautyServiceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews_and_ratings" DROP COLUMN "serviceId",
ADD COLUMN     "beautyServiceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "beauty_services" (
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

    CONSTRAINT "beauty_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "beauty_services" ADD CONSTRAINT "beauty_services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_and_ratings" ADD CONSTRAINT "reviews_and_ratings_beautyServiceId_fkey" FOREIGN KEY ("beautyServiceId") REFERENCES "beauty_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_beautyServiceId_fkey" FOREIGN KEY ("beautyServiceId") REFERENCES "beauty_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
