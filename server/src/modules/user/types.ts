import { User } from "@prisma/client";
import { Matches, MinLength, NotContains } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Matches(/^[A-Za-z0-9]+$/, { message: "Solo letras, números y _" })
  @NotContains(" ", { message: "Sin espacios" })
  @MinLength(3, { message: "Al menos 3 caracteres" })
  username: string;

  @Field()
  @NotContains(" ", { message: "Sin espacios" })
  @MinLength(3, { message: "Al menos 3 caracteres" })
  password: string;
}
