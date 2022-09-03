import React from "react";
import { Box, Img, ImgProps } from "@chakra-ui/react";
import { ItemStoreQuery } from "@/generated";

type Props = {
  item: ItemStoreQuery["itemStore"][number]["item"];
  boxSize?: ImgProps["boxSize"];
  noPadding?: boolean;
};

const ItemImage = ({ item, boxSize, noPadding = false }: Props) => {
  const src = React.useMemo(() => {
    const { stat, value } = item;

    const base =
      stat.name === "ATK" ? "sword" : stat.name === "DEF" ? "shield" : "health";
    const suffix = value === 10 ? "1" : value === 20 ? "2" : "3";
    const name = `${base}_${suffix}`;

    return `/images/${name}.png`;
  }, [item]);

  return (
    <Box p={noPadding ? 0 : 2}>
      <Img src={src} boxSize={boxSize} />
    </Box>
  );
};

export default ItemImage;
