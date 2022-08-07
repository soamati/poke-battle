import type { NextPage } from "next";
import NextLink from "next/link";
import { HStack, Link, Stack, Text } from "@chakra-ui/react";
import client from "@/client";
import Page from "@/components/Page";
import { WhoamiQuery, usePokemonsQuery, useWhoamiQuery } from "@/generated";
import withAuthGSSP from "@/lib/withAuthGSSP";
import { Is } from "@/types";

export const getServerSideProps = withAuthGSSP();

type Props = {
  user: Is<WhoamiQuery["whoami"]>;
};

const Home: NextPage<Props> = ({ user }) => {
  const { data, isLoading } = usePokemonsQuery(client);

  const { data: currentUser, isLoading: isLoadingUser } = useWhoamiQuery(
    client,
    undefined,
    { initialData: { whoami: user } }
  );

  if (isLoading || isLoadingUser) {
    return <div>cargando...</div>;
  }

  if (!data || !currentUser) {
    return <div>algo salió mal</div>;
  }

  return (
    <Page>
      <Stack>
        <HStack spacing={4}>
          <NextLink href="/store/pokemon">
            <Link>Tienda Pokémon</Link>
          </NextLink>
          <NextLink href="/store/item">
            <Link>Tienda Items</Link>
          </NextLink>
        </HStack>
        <Text>{JSON.stringify(currentUser, null, 2)}</Text>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </Stack>
    </Page>
  );
};

export default Home;
