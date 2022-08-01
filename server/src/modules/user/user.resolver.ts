import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../types";
import { UserInput } from "./types";
import { UserType } from "./user.schema";
import { compare, hash } from "bcrypt";
import { cookieOptions, createAccessToken } from "./util";
import { verify } from "jsonwebtoken";

const SIGNIN_ERROR = "Credenciales incorrectas";

@Resolver()
export class UserResolver {
  @Mutation(() => UserType)
  async signup(@Arg("data") data: UserInput, @Ctx() { res, prisma }: Context) {
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
      res.cookie("poke-token", token, cookieOptions);

      return user;
    } catch (error: any) {
      if (error.code === "P2002") {
        error.message = "El usuario ya existe";
      }
      throw error;
    }
  }

  @Mutation(() => UserType)
  async signin(@Arg("data") data: UserInput, @Ctx() { res, prisma }: Context) {
    const user = await prisma.user.findFirst({
      where: { username: data.username },
    });

    if (!user) throw new Error(SIGNIN_ERROR);
    const { password, ...rest } = user;

    const isCorrect = await compare(data.password, user.password);

    if (!isCorrect) throw new Error(SIGNIN_ERROR);

    const token = createAccessToken(rest);
    res.cookie("poke-token", token, cookieOptions);

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
  signout(@Ctx() { res }: Context) {
    try {
      res.clearCookie("poke-token", cookieOptions);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
