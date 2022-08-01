import { PrismaClient } from "@prisma/client";
import { defaultStats } from "./constants";

export class StatService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createDefaults() {
    const stats = await this.prisma.stat.findMany();
    if (stats.length > 0) return;
    await this.prisma.stat.createMany({
      data: [...defaultStats],
    });
  }
}
