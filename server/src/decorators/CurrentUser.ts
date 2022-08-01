import { createParamDecorator } from "type-graphql";
import { Context } from "../types";

export function CurrentUser() {
  return createParamDecorator<Context>(({ context }) => {
    const { user } = context;
    return user;
  });
}
