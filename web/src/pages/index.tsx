import client from "src/client";
import type { NextPage } from "next";
import { usePokemonsQuery } from "src/generated";
import Page from "src/components/Page";

const Home: NextPage = () => {
  const { data, isLoading } = usePokemonsQuery(client);

  if (!data || isLoading) {
    return <div>loading...</div>;
  }

  return <Page>{JSON.stringify(data, null, 2)}</Page>;
};

export default Home;
