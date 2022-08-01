/*
  Warnings:

  - You are about to drop the `ItemStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemStore" DROP CONSTRAINT "ItemStore_item_id_fkey";

-- DropTable
DROP TABLE "ItemStore";

-- CreateTable
CREATE TABLE "item_store" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "item_store_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_store" ADD CONSTRAINT "item_store_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
