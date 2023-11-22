/*
  Warnings:

  - Made the column `comment` on table `feedbacks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "feedbacks" ALTER COLUMN "comment" SET NOT NULL;
