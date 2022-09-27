import React from "react";
import NextLink from "next/link";
import client from "@/client";
import InventoryItem from "./InventoryItem";
import { Center, Link, Spinner, Stack, Text } from "@chakra-ui/react";
import { useInventoryQuery } from "@/generated";

type Props = {
  isPreview?: boolean;
};

const UserInventory = ({ isPreview }: Props) => {
  const { data } = useInventoryQuery(client);

  if (!data) {
    return (
      <Center p={2}>
        <Spinner />
      </Center>
    );
  }

  if (!data.inventory.length) {
    return (
      <Stack align="center">
        <Text textAlign="center">Aún no tienes ningún item</Text>
        <Text textAlign="center">Adquiere items en la tienda</Text>
        <NextLink href="/store/item" passHref>
          <Link fontWeight="semibold">Ir a tienda de items</Link>
        </NextLink>
      </Stack>
    );
  }

  return (
    <Stack spacing={4}>
      {data.inventory
        .filter(({ units }) => units > 0)
        .slice(0, isPreview ? 5 : undefined)
        .map(({ item, units }) => {
          return <InventoryItem key={item.id} item={item} units={units} />;
        })}
    </Stack>
  );
};

export default UserInventory;
