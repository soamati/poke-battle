import React from "react";
import client from "@/client";
import { Center, HStack, Spinner, Tag, Text } from "@chakra-ui/react";
import { useWalletQuery } from "@/generated";

const Wallet = () => {
  const { data } = useWalletQuery(client);

  if (!data || !data.wallet)
    return (
      <Center>
        <Spinner size="sm" />
      </Center>
    );

  return (
    <HStack justify="end">
      <Text>Pokécoins disponibles:</Text>
      <Tag colorScheme="yellow">{data.wallet.amount}</Tag>
    </HStack>
  );
};

export default Wallet;
