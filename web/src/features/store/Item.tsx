import React from "react";
import ItemImage from "@/components/ItemImage";
import useColors from "@/hooks/useColors";
import ItemDescription from "@/components/ItemDescription";
import { Stack, Heading, Button, Tag } from "@chakra-ui/react";
import { ItemStoreQuery } from "@/generated";
import { useCartContext } from "./CartProvider";

type Props = ItemStoreQuery["itemStore"][number];

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
      <ItemDescription item={item} />
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
