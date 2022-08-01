import { User } from "@prisma/client";
import { Matches, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @MinLength(3, { message: "Al menos 3 caracteres" })
  @Matches(/^[A-Za-z0-9]+$/, { message: "Solo letras, números y _" })
  username: string;

  @Field()
  @MinLength(3, { message: "Al menos 3 caracteres" })
  password: string;
}
