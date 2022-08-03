import type { NextPage } from "next";
import { usePokemonsQuery } from "src/generated";
import client from "src/client";
import Page from "src/components/Page";
import withAuthGSSP from "src/lib/withAuthGSSP";

const Home: NextPage = () => {
  const { data, isLoading } = usePokemonsQuery(client);

  if (!data || isLoading) {
    return <div>loading...</div>;
  }

  return <Page>{JSON.stringify(data, null, 2)}</Page>;
};

export default Home;

export const getServerSideProps = withAuthGSSP();
