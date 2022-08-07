import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CurrentUser } from "../../decorators/CurrentUser";
import { IsAuth } from "../../middlewares/IsAuth";
import { Context, CurrentUserType } from "../../types";
import { InventoryItem } from "./item.schema";
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
}
