/*
  Warnings:

  - Added the required column `price` to the `item_store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_store" ADD COLUMN     "price" INTEGER NOT NULL;
