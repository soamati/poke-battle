import { PrismaClient } from "@prisma/client";
import { defaultItems } from "./constants";
import { BuyItemInput } from "./types";

type TCountByItem = {
  [id: number]: number;
};

export class ItemService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createDefaults() {
    const items = await this.prisma.item.findMany();
    if (items.length > 0) return;

    const create = defaultItems.map((item) => {
      const price = item.value >= 50 ? 100 : item.value >= 20 ? 50 : 25;

      return this.prisma.item.create({
        data: { ...item, stock: { create: { price } } },
      });
    });

    await this.prisma.$transaction(create);
  }

  findById(id: number) {
    return this.prisma.item.findFirst({
      where: { id },
      include: { stat: true, stock: true },
    });
  }

  async findToBuy(itemsWithCount: BuyItemInput["itemsWithCount"]) {
    const arrId = itemsWithCount.map(({ itemId }) => itemId);

    const countByItem = itemsWithCount.reduce<TCountByItem>(
      (acc, { itemId, count }) => {
        return { ...acc, [itemId]: count };
      },
      {}
    );

    const items = await this.prisma.item.findMany({
      where: { id: { in: arrId } },
      include: { stat: true, stock: true },
    });

    if (items.length !== arrId.length) {
      return null;
    }

    const total = items.reduce((acc, { id, stock }) => {
      const count = countByItem[id];
      if (!stock || !count) return acc;
      return acc + stock.price * count;
    }, 0);

    const products = items.map((item) => {
      const units = countByItem[item.id];
      return { item, units };
    });

    return { products, total };
  }

  findUserInventory(id: number) {
    return this.prisma.userItem.findMany({
      where: { userId: id },
      include: { item: { include: { stat: true } } },
    });
  }

  async store(skip: number, ownerId?: number) {
    const items = await this.prisma.itemStore.findMany({
      include: {
        item: {
          include: {
            stat: true,
            ownedBy: { where: { userId: ownerId }, select: { units: true } },
          },
        },
      },
      orderBy: [{ price: "asc" }, { item: { id: "asc" } }],
      skip,
      take: 20,
    });

    return items.map(({ item, price }) => {
      const { ownedBy, ...rest } = item;
      const onInventory = ownedBy[0] ? ownedBy[0].units : 0;

      return { item: rest, price, onInventory };
    });
  }
}
