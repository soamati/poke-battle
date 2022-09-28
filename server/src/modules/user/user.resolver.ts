import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context, CurrentUserType } from "../../types";
import { UserInput, UserStatType, WalletType } from "./types";
import { UserType } from "./user.schema";
import { compare, hash } from "bcrypt";
import { cookieOptions, createAccessToken } from "./util";
import { verify } from "jsonwebtoken";
import { IsAuth } from "../../middlewares/IsAuth";
import { CurrentUser } from "../../decorators/CurrentUser";

const SIGNIN_ERROR = "Credenciales incorrectas";

@Resolver()
export class UserResolver {
  @Mutation(() => UserType)
  async signup(
    @Arg("data") data: UserInput,
    @Ctx() { req, res, prisma }: Context
  ) {
    try {
      const { username, password } = data;
      const hashed = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          password: hashed,
          wallet: { create: { amount: 1000 } },
        },
        select: { id: true, username: true },
      });

      const token = createAccessToken(user);
      res.cookie("poke-token", token, cookieOptions(req));

      return user;
    } catch (error: any) {
      if (error.code === "P2002") {
        error.message = "El usuario ya existe";
      }
      throw error;
    }
  }

  @Mutation(() => UserType)
  async signin(
    @Arg("data") data: UserInput,
    @Ctx() { req, res, prisma }: Context
  ) {
    const user = await prisma.user.findFirst({
      where: { username: data.username },
    });

    if (!user) throw new Error(SIGNIN_ERROR);
    const { password, ...rest } = user;

    const isCorrect = await compare(data.password, user.password);

    if (!isCorrect) throw new Error(SIGNIN_ERROR);

    const token = createAccessToken(rest);
    res.cookie("poke-token", token, cookieOptions(req));

    return rest;
  }

  @Query(() => UserType, { nullable: true })
  async whoami(@Ctx() { req, prisma }: Context) {
    const token = req.cookies["poke-token"];
    if (!token) return null;

    const { id } = verify(token, process.env.SECRET as string) as UserType;
    const user = await prisma.user.findFirst({ where: { id } });

    return user;
  }

  @Mutation(() => Boolean)
  signout(@Ctx() { req, res }: Context) {
    try {
      res.clearCookie("poke-token", cookieOptions(req));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @UseMiddleware(IsAuth)
  @Query(() => WalletType, { nullable: true })
  async wallet(
    @CurrentUser() user: CurrentUserType,
    @Ctx() { prisma }: Context
  ) {
    const wallet = await prisma.wallet.findFirst({
      where: { userId: user.id },
    });

    return wallet;
  }

  @UseMiddleware(IsAuth)
  @Query(() => UserStatType)
  async userStat(
    @Ctx() { prisma }: Context,
    @CurrentUser() { id }: CurrentUserType
  ): Promise<UserStatType> {
    const [winCount, loseCount] = await prisma.$transaction([
      prisma.battle.count({
        where: { userId: id, winner: "USER" },
      }),
      prisma.battle.count({
        where: { userId: id, winner: "RIVAL" },
      }),
    ]);

    const allCount = winCount + loseCount;
    const winRate = calcWinRate(allCount, winCount);

    return { battleStat: { allCount, winCount, loseCount, winRate } };
  }
}

function calcWinRate(allCount: number, winCount: number) {
  return allCount > 0 ? Number(((winCount / allCount) * 100).toFixed(2)) : 0;
}
