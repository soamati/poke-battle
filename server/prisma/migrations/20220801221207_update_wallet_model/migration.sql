/*
  Warnings:

  - The primary key for the `wallet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `wallet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "wallet_user_id_key";

-- AlterTable
ALTER TABLE "wallet" DROP CONSTRAINT "wallet_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "wallet_pkey" PRIMARY KEY ("user_id");
