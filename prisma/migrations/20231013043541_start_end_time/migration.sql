/*
  Warnings:

  - You are about to drop the column `slot` on the `carts` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" DROP COLUMN "slot",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;
