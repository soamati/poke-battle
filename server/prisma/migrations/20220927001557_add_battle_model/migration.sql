-- CreateEnum
CREATE TYPE "Winner" AS ENUM ('USER', 'RIVAL');

-- CreateTable
CREATE TABLE "battle" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rival_id" INTEGER NOT NULL,
    "winner" "Winner" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "battle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "battle" ADD CONSTRAINT "battle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battle" ADD CONSTRAINT "battle_rival_id_fkey" FOREIGN KEY ("rival_id") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
