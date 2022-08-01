/*
  Warnings:

  - The primary key for the `item_store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `item_store` table. All the data in the column will be lost.
  - The primary key for the `pokemon_store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pokemon_store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item_store" DROP CONSTRAINT "item_store_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "item_store_pkey" PRIMARY KEY ("item_id");

-- AlterTable
ALTER TABLE "pokemon_store" DROP CONSTRAINT "pokemon_store_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "pokemon_store_pkey" PRIMARY KEY ("pokemon_id");

-- CreateTable
CREATE TABLE "user_pokemon" (
    "user_id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "units" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_pokemon_pkey" PRIMARY KEY ("user_id","pokemon_id")
);

-- AddForeignKey
ALTER TABLE "user_pokemon" ADD CONSTRAINT "user_pokemon_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pokemon" ADD CONSTRAINT "user_pokemon_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
