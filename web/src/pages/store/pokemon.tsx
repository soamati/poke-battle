import React from "react";
import dynamic from "next/dynamic";
import Page from "@/components/Page";
import Wallet from "@/features/user/Wallet";
import withAuthGSSP from "@/lib/withAuthGSSP";
import Link from "next/link";
import { WhoamiQuery } from "@/generated";
import { Is } from "@/types";
import { Button, HStack, Icon, Stack } from "@chakra-ui/react";
import { RiSwordFill } from "react-icons/ri";

const Store = dynamic(() => import("src/features/store/PokemonStore"), {
  ssr: false,
});

type Props = {
  user: Is<WhoamiQuery["whoami"]>;
};

const PokemonStorePage = ({ user: _ }: Props) => {
  return (
    <Page>
      <Stack>
        <HStack justify="space-between" py={2}>
          <Wallet />

          <Link href="/store/item" passHref>
            <Button
              leftIcon={<Icon as={RiSwordFill} />}
              colorScheme="yellow"
              size="sm"
              variant="ghost"
            >
              Tienda de items
            </Button>
          </Link>
        </HStack>
        <Store />
      </Stack>
    </Page>
  );
};

export default PokemonStorePage;

export const getServerSideProps = withAuthGSSP();
