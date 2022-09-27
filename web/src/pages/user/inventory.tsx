import React from "react";
import Page from "@/layout/Page";
import withAuthGSSP from "@/lib/withAuthGSSP";
import UserInventory from "@/features/user/UserInventory";

export const getServerSideProps = withAuthGSSP();

const InventoryPage = () => {
  return (
    <Page>
      <UserInventory />
    </Page>
  );
};

export default InventoryPage;
