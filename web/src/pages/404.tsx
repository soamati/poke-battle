import React from "react";
import Page from "@/layout/Page";
import Link from "next/link";
import { Center, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { MdCatchingPokemon } from "react-icons/md";
import withAuthGSSP from "@/lib/withAuthGSSP";

export const getServerSideProps = withAuthGSSP();

const NotFoundPage = () => {
  return (
    <Page full showNav={false}>
      <Center flex={1}>
        <Stack align="center">
          <Link href="/" passHref>
            <HStack cursor="pointer">
              <Icon as={MdCatchingPokemon} />
              <Text size="sm">PokéBattle</Text>
            </HStack>
          </Link>

          <Text textAlign="center">No encontramos lo que buscabas</Text>
        </Stack>
      </Center>
    </Page>
  );
};

export default NotFoundPage;
