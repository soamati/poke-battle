import { User } from "@prisma/client";
import { Field, ObjectType } from "type-graphql";

@ObjectType("User")
export class UserType implements Partial<User> {
  @Field()
  id: number;

  @Field()
  username: string;
}
