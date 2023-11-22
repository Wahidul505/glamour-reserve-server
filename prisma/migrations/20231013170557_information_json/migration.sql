/*
  Warnings:

  - Changed the type of `information` on the `categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "information",
ADD COLUMN     "information" JSONB NOT NULL;
