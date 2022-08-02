import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { CurrentUser } from "../../decorators/CurrentUser";
import { IsAuth } from "../../middlewares/IsAuth";
import { Context, CurrentUserType } from "../../types";
import { ItemType } from "./item.schema";

@Resolver()
export class ItemResolver {
  @UseMiddleware(IsAuth)
  @Mutation(() => ItemType)
  async buyItem(
    @Arg("id") id: number,
    @Ctx() { items, prisma }: Context,
    @CurrentUser() user: CurrentUserType
  ) {
    try {
      const item = await items.findById(id);

      if (!item || !item.stock) {
        throw new Error("No está a la venta");
      }

      if (item.stock.price > user.wallet.amount) {
        throw new Error("No tenés suficientes Pokécoins");
      }

      const {
        wallet: { amount },
        id: userId,
      } = user;

      const {
        stock: { price },
        id: itemId,
      } = item;

      const updateWallet = prisma.wallet.update({
        data: { amount: amount - price },
        where: { userId },
      });

      const updateInventory = prisma.userItem.upsert({
        where: { userId_itemId: { userId, itemId } },
        create: { userId, itemId, units: 1 },
        update: { units: { increment: 1 } },
      });

      await prisma.$transaction([updateWallet, updateInventory]);

      return item;
    } catch (error: any) {
      error.message = "No se pudo realizar la compra";
      throw error;
    }
  }
}
