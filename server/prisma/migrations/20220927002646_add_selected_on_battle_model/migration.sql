/*
  Warnings:

  - Added the required column `selected_id` to the `battle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "battle" ADD COLUMN     "selected_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "battle" ADD CONSTRAINT "battle_selected_id_fkey" FOREIGN KEY ("selected_id") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
