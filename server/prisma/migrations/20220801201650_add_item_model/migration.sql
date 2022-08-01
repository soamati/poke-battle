-- CreateEnum
CREATE TYPE "ItemMode" AS ENUM ('PERCENTAGE', 'ABSOLUTE');

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mode" "ItemMode" NOT NULL,
    "value" INTEGER NOT NULL,
    "stat_id" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_name_key" ON "item"("name");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_stat_id_fkey" FOREIGN KEY ("stat_id") REFERENCES "stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
