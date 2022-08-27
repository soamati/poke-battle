import React from "react";
import client from "@/client";
import { useInventoryQuery } from "@/generated";
import {
  Button,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Tag,
} from "@chakra-ui/react";
import useColors from "@/hooks/useColors";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";

const Inventory = () => {
  const { fg } = useColors();
  const { data, isLoading } = useInventoryQuery(client);

  if (isLoading) {
    return (
      <Center p="4">
        <Spinner />
      </Center>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <SimpleGrid minChildWidth="200px" spacing={2}>
      {data.inventory.map(({ item, units }) => (
        <Stack
          key={item.id}
          borderColor={fg}
          borderWidth={1}
          align="center"
          p="4"
          rounded="sm"
          spacing="4"
        >
          <Heading size="sm">{item.name}</Heading>
          <ItemImage item={item} />
          <ItemDescription item={item} />
          <Button size="sm" colorScheme="yellow">
            Usar
          </Button>
          <Tag colorScheme="yellow">Tienes: {units}</Tag>
        </Stack>
      ))}
    </SimpleGrid>
  );
};

export default Inventory;
