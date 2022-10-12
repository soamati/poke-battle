import React from "react";
import Page from "@/layout/Page";
import { Center, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { MdCatchingPokemon } from "react-icons/md";

const ErrorPage = () => {
  return (
    <Page full showNav={false} showHeader={false}>
      <Center flex={1}>
        <Stack align="center">
          <HStack>
            <Icon as={MdCatchingPokemon} />
            <Text size="sm">PokéBattle</Text>
          </HStack>

          <Text textAlign="center">Algo salió mal 😭</Text>
        </Stack>
      </Center>
    </Page>
  );
};

export default ErrorPage;
