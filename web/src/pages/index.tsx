import type { NextPage } from "next";
import client from "src/client";
import Page from "src/components/Page";
import withAuthGSSP from "src/lib/withAuthGSSP";
import NextLink from "next/link";
import { usePokemonsQuery, useWhoamiQuery, WhoamiQuery } from "src/generated";
import { Is } from "src/types";
import { HStack, Link, Stack, Text } from "@chakra-ui/react";

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
        <HStack>
          <NextLink href="/store/pokemon">
            <Link>Tienda Pokémon</Link>
          </NextLink>
        </HStack>
        <Text>{JSON.stringify(currentUser, null, 2)}</Text>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </Stack>
    </Page>
  );
};

export default Home;
