import { Pokemon } from "./generated";

export type Is<T> = Exclude<T, null | undefined>;

export type Callback = (...args: any[]) => any;

export type Contender = Pokemon & { currentHP: number };
