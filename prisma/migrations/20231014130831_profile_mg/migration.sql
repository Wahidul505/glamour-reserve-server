/*
  Warnings:

  - You are about to drop the column `rating` on the `feedbacks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profileImg" TEXT;
