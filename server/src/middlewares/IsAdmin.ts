import { MiddlewareFn } from "type-graphql";
import { Context } from "../types";

export const IsAdmin: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.user || context.user.username !== process.env.ADMIN) {
    throw new Error("Only admin");
  }

  return next();
};
