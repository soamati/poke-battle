import { Tag } from "@chakra-ui/react";
import Span from "./Span";

export const Attack = () => <Tag colorScheme="red">ATK</Tag>;
export const Defense = () => <Tag colorScheme="blue">DEF</Tag>;
export const Health = () => <Tag colorScheme="green">HP</Tag>;
export const Attacker = () => <Span fontWeight="semibold">ATACANTE</Span>;
export const Defender = () => <Span fontWeight="semibold">DEFENSOR</Span>;
