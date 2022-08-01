-- CreateTable
CREATE TABLE "pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);
