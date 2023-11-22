/*
  Warnings:

  - You are about to drop the column `additionalInformation` on the `makeover_services` table. All the data in the column will be lost.
  - Added the required column `information` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "information" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "makeover_services" DROP COLUMN "additionalInformation";
