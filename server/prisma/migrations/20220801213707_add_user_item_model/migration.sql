-- CreateTable
CREATE TABLE "user_item" (
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "units" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_item_pkey" PRIMARY KEY ("user_id","item_id")
);

-- AddForeignKey
ALTER TABLE "user_item" ADD CONSTRAINT "user_item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_item" ADD CONSTRAINT "user_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
