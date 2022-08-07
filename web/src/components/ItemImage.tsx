import React from "react";
import { Box, Img } from "@chakra-ui/react";
import { ItemStoreQuery } from "@/generated";

type Props = {
  item: ItemStoreQuery["itemStore"][number]["item"];
};

const ItemImage = ({ item }: Props) => {
  const src = React.useMemo(() => {
    const { stat, value } = item;

    const base =
      stat.name === "ATK" ? "sword" : stat.name === "DEF" ? "shield" : "health";
    const suffix = value === 10 ? "1" : value === 20 ? "2" : "3";
    const name = `${base}_${suffix}`;

    return `/images/${name}.png`;
  }, [item]);

  return (
    <Box p="2">
      <Img src={src} />
    </Box>
  );
};

export default ItemImage;
