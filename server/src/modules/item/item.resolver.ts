import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CurrentUser } from "../../decorators/CurrentUser";
import { IsAuth } from "../../middlewares/IsAuth";
import { Context, CurrentUserType } from "../../types";
import { InventoryItem, ItemType } from "./item.schema";
import { BuyItemInput } from "./types";

const CONTEMPLATED_ERRORS = {
  UNAVAILABLE_ITEM: "Algún item no está a la venta",
  INSUFFICIENT_POKECOINS: "No tenés suficientes Pokécoins",
};

@Resolver()
export class ItemResolver {
  @UseMiddleware(IsAuth)
  @Query(() => [InventoryItem])
  inventory(@Ctx() { items }: Context, @CurrentUser() user: CurrentUserType) {
    return items.findUserInventory(user.id);
  }

  @UseMiddleware(IsAuth)
  @Mutation(() => Boolean)
  async buyItems(
    @Arg("data") { itemsWithCount }: BuyItemInput,
    @Ctx() { items, prisma }: Context,
    @CurrentUser() user: CurrentUserType
  ) {
    try {
      const toBuy = await items.findToBuy(itemsWithCount);

      if (!toBuy) {
        throw new Error(CONTEMPLATED_ERRORS.UNAVAILABLE_ITEM);
      }

      const { products, total } = toBuy;

      if (total > user.wallet.amount) {
        throw new Error(CONTEMPLATED_ERRORS.INSUFFICIENT_POKECOINS);
      }

      const { amount, userId } = user.wallet;

      const updateWallet = prisma.wallet.update({
        data: { amount: amount - total },
        where: { userId },
      });

      const updateInventory = products.map((product) => {
        const itemId = product.item.id;
        const units = product.units;

        return prisma.userItem.upsert({
          where: { userId_itemId: { userId, itemId } },
          create: { userId, itemId, units },
          update: { units: { increment: units } },
        });
      });

      await prisma.$transaction([updateWallet, ...updateInventory]);

      return true;
    } catch (error: any) {
      if (!Object.values(CONTEMPLATED_ERRORS).includes(error.message)) {
        error.message = "No se pudo realizar la compra";
      }
      throw error;
    }
  }

  @UseMiddleware(IsAuth)
  @Mutation(() => ItemType)
  async spendItem(
    @CurrentUser() user: CurrentUserType,
    @Ctx() ctx: Context,
    @Arg("itemId", () => Int) itemId: number
  ) {
    try {
      const { prisma } = ctx;

      let onInventory = await prisma.userItem.findUnique({
        where: { userId_itemId: { userId: user.id, itemId } },
        include: { item: true },
      });

      if (!onInventory || onInventory.units < 1) {
        throw new Error("No units available");
      }

      onInventory = await prisma.userItem.update({
        where: { userId_itemId: { userId: user.id, itemId } },
        data: { units: { decrement: 1 } },
        include: { item: true },
      });

      if (!onInventory) {
        throw new Error("Update item error");
      }

      return onInventory.item;
    } catch (spendError) {
      console.log({ spendError });
      throw new Error("No se pudo consumir el item");
    }
  }
}
