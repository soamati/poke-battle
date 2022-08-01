/*
  Warnings:

  - You are about to drop the column `units` on the `user_pokemon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_pokemon" DROP COLUMN "units",
ADD COLUMN     "luck" DOUBLE PRECISION NOT NULL DEFAULT 1;
