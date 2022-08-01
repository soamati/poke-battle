-- CreateTable
CREATE TABLE "pokemon_store" (
    "id" SERIAL NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "pokemon_store_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pokemon_store" ADD CONSTRAINT "pokemon_store_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
