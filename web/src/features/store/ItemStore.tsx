import React from "react";
import client from "@/client";
import Item from "./Item";
import { useItemStoreQuery } from "@/generated";
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";

const ItemStore = () => {
  const { data } = useItemStoreQuery(client, { skip: 0 });

  if (!data) {
    return (
      <Center p={4}>
        <Spinner />
      </Center>
    );
  }

  return (
    <SimpleGrid minChildWidth="250px" spacing={4}>
      {data.itemStore.map(({ item, price, onInventory }, i) => (
        <Item
          key={item.id}
          item={item}
          price={price}
          onInventory={onInventory}
        />
      ))}
    </SimpleGrid>
  );
};

export default ItemStore;
