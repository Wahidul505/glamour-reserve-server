/*
  Warnings:

  - You are about to drop the column `availibility` on the `makeover_services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "makeover_services" DROP COLUMN "availibility",
ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT true;
