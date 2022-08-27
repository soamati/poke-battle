import React from "react";
import getDescription from "@/features/store/getItemDescription";
import { Item } from "@/generated";
import { Tag } from "@chakra-ui/react";

type Props = {
  item: Item;
};

const ItemDescription = ({ item }: Props) => {
  return (
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
  );
};

export default ItemDescription;
