import { PrismaClient } from "@prisma/client";
import { defaultItems } from "./constants";

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

  store(skip: number) {
    return this.prisma.itemStore.findMany({
      include: { item: { include: { stat: true } } },
      orderBy: [{ price: "asc" }, { item: { id: "asc" } }],
      skip,
      take: 20,
    });
  }
}
