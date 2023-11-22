/*
  Warnings:

  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alternativeContactNo` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNo` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `makeoverServiceId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `reviews_and_ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_makeoverServiceId_fkey";

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "alternativeContactNo" TEXT NOT NULL,
ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "makeoverServiceId" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "reviews_and_ratings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "carts";

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_makeoverServiceId_fkey" FOREIGN KEY ("makeoverServiceId") REFERENCES "makeover_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
