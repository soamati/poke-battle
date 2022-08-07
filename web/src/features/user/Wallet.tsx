import React from "react";
import client from "@/client";
import { HStack, Tag, Text } from "@chakra-ui/react";
import { useWalletQuery } from "@/generated";

const Wallet = () => {
  const { data } = useWalletQuery(client);

  if (!data?.wallet) return null;

  return (
    <HStack py={4} justify="end">
      <Text>Pokécoins disponibles:</Text>
      <Tag colorScheme="yellow">{data.wallet.amount}</Tag>
    </HStack>
  );
};

export default Wallet;
