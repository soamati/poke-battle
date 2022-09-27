import React from "react";
import UserPokedex from "@/features/user/UserPokedex";
import Page from "@/layout/Page";
import withAuthGSSP from "@/lib/withAuthGSSP";

export const getServerSideProps = withAuthGSSP();

const PokedexPage = () => {
  return (
    <Page>
      <UserPokedex />
    </Page>
  );
};

export default PokedexPage;
