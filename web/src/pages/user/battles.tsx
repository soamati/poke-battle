import React from "react";
import Page from "@/layout/Page";
import withAuthGSSP from "@/lib/withAuthGSSP";
import UserBattles from "@/features/user/UserBattles";

export const getServerSideProps = withAuthGSSP();

const BattlesPage = () => {
  return (
    <Page>
      <UserBattles />
    </Page>
  );
};

export default BattlesPage;
