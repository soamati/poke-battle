import React from "react";
import { Stack, Heading, Button, Tag } from "@chakra-ui/react";
import ItemImage from "@/components/ItemImage";
import { ItemStoreQuery } from "@/generated";
import { useCartContext } from "./CartProvider";
import useColors from "@/hooks/useColors";

type Props = ItemStoreQuery["itemStore"][number];

function getDescription(item: Props["item"]) {
  const stat =
    item.stat.name === "ATK"
      ? "el ataque"
      : item.stat.name === "DEF"
      ? "la defensa"
      : "la salud";

  const description = `Aumenta ${stat} en ${item.value}${
    item.mode === "PERCENTAGE" ? "%" : ""
  }`;

  return description;
}

const Item = ({ item, price, onInventory }: Props) => {
  const colors = useColors();
  const { add } = useCartContext();

  return (
    <Stack
      borderColor={colors.fg}
      borderWidth={1}
      align="center"
      p="4"
      rounded="sm"
      spacing="4"
    >
      <Heading size="sm">{item.name}</Heading>
      <ItemImage item={item} />

      <Tag
        colorScheme={
          item.stat.name === "ATK"
            ? "red"
            : item.stat.name === "DEF"
            ? "blue"
            : "green"
        }
      >
        {getDescription(item)}
      </Tag>
      <Heading size="sm">Precio: {price} PC</Heading>

      <Button
        size="sm"
        colorScheme="yellow"
        onClick={() => add({ item, price })}
      >
        Agregar al carrito
      </Button>

      <Tag colorScheme="yellow">En inventario: {onInventory}</Tag>
    </Stack>
  );
};

export default Item;
