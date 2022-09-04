import React from "react";
import client from "@/client";
import { Item, useInventoryQuery } from "@/generated";
import {
  Button,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Tag,
  useToast,
} from "@chakra-ui/react";
import useColors from "@/hooks/useColors";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import { useBattle } from "@/features/battle/BattleProvider";

const Inventory = () => {
  const { fg } = useColors();
  const { data, isLoading } = useInventoryQuery(client);
  const [state, dispatch] = useBattle();
  const toast = useToast();

  const noSlots = state.itemSlots.a !== null && state.itemSlots.b !== null;

  const pickRivalItem = React.useCallback(
    (item: Item) => {
      if (!data || data.inventory.length <= 1) {
        return item;
      }
      let pickedIndex = Math.floor(Math.random() * data.inventory.length);
      return data.inventory[pickedIndex].item;
    },
    [data]
  );

  const handleUse = React.useCallback(
    (item: Item, units: number) => {
      if (
        units === 1 &&
        Object.values(state.itemSlots).find(
          (used) => used && used.id === item.id
        )
      ) {
        // Already used and no more units
        toast({
          isClosable: true,
          title: "Solo tienes 1 unidad",
          status: "warning",
          position: "top",
        });
        return;
      }
      dispatch({
        type: "addItem",
        payload: { item, rivalItem: pickRivalItem(item) },
      });
    },
    [state, dispatch, toast, pickRivalItem]
  );

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
          <Button
            size="sm"
            colorScheme="yellow"
            isDisabled={noSlots}
            onClick={() => handleUse(item, units)}
          >
            Usar
          </Button>
          <Tag colorScheme="yellow">Tienes: {units}</Tag>
        </Stack>
      ))}
    </SimpleGrid>
  );
};

export default Inventory;
