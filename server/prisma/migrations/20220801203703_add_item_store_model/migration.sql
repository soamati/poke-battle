-- CreateTable
CREATE TABLE "ItemStore" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "ItemStore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemStore" ADD CONSTRAINT "ItemStore_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
