import { MiddlewareFn } from "type-graphql";
import { Context } from "../types";

export const IsAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.user) {
    throw new Error("Ingresá para realizar esta acción");
  }

  return next();
};
