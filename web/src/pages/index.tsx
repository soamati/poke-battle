import React from "react";
import NextLink from "next/link";
import withAuthGSSP from "@/lib/withAuthGSSP";
import Page from "@/layout/Page";
import { Button, HStack, Stack, Text, Link } from "@chakra-ui/react";
import { Is } from "@/types";
import { WhoamiQuery } from "@/generated";
import UserBattles from "@/features/user/UserBattles";
import UserPokedex from "@/features/user/UserPokedex";
import UserInventory from "@/features/user/UserInventory";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Profile from "@/features/user/Profile";

export const getServerSideProps = withAuthGSSP();

type Props = {
  user: Is<WhoamiQuery["whoami"]>;
};

const HomePage = ({ user }: Props) => {
  return (
    <Page>
      <Stack spacing={8} pt={2}>
        {/* Profile */}
        <Profile user={user} />

        {/* Pokedex */}
        <Stack spacing={6}>
          <HStack justify="space-between">
            <Text fontWeight="bold">Pokédex</Text>
            <NextLink href="/user/pokedex" passHref>
              <Button rightIcon={<ArrowForwardIcon />} variant="link">
                Ver todo
              </Button>
            </NextLink>
          </HStack>
          <UserPokedex isPreview />
        </Stack>

        {/* Inventory */}
        <Stack spacing={6}>
          <HStack justify="space-between">
            <Text fontWeight="bold">Inventario</Text>
            <NextLink href="/user/inventory" passHref>
              <Button rightIcon={<ArrowForwardIcon />} variant="link">
                Ver todo
              </Button>
            </NextLink>
          </HStack>
          <UserInventory isPreview />
        </Stack>

        {/* Battles */}
        <Stack spacing={6}>
          <HStack justify="space-between">
            <Text fontWeight="bold">Batallas</Text>
            <NextLink href="/user/battles" passHref>
              <Button rightIcon={<ArrowForwardIcon />} variant="link">
                Ver todo
              </Button>
            </NextLink>
          </HStack>
          <UserBattles isPreview />
        </Stack>
      </Stack>
    </Page>
  );
};

export default HomePage;
