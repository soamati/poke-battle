import React from "react";
import dynamic from "next/dynamic";
import Page from "@/components/Page";
import Wallet from "@/features/user/Wallet";
import withAuthGSSP from "@/lib/withAuthGSSP";
import { WhoamiQuery } from "@/generated";
import { Is } from "@/types";
import { Button, HStack, Icon, Stack } from "@chakra-ui/react";
import useColors from "@/hooks/useColors";
import { RiSwordFill } from "react-icons/ri";
import Link from "next/link";

const Store = dynamic(() => import("src/features/store/PokemonStore"), {
  ssr: false,
});

type Props = {
  user: Is<WhoamiQuery["whoami"]>;
};

const PokemonStorePage = ({ user: _ }: Props) => {
  const colors = useColors();
  return (
    <Page>
      <Stack py={8}>
        <HStack
          justify="space-between"
          position="sticky"
          top={2}
          bg={colors.bg}
          zIndex={1000}
          borderWidth={1}
          borderColor={colors.fg}
          px={4}
          rounded="md"
        >
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
