import React from "react";
import ItemStore from "@/features/store/ItemStore";
import withAuthGSSP from "@/lib/withAuthGSSP";
import { Stack } from "@chakra-ui/react";
import Cart from "@/features/store/Cart";
import CartProvider from "@/features/store/CartProvider";
import Page from "@/layout/Page";

type Props = {};

const ItemStorePage = (_props: Props) => {
  return (
    <Page>
      <Stack>
        <CartProvider>
          <Cart />
          <ItemStore />
        </CartProvider>
      </Stack>
    </Page>
  );
};

export default ItemStorePage;

export const getServerSideProps = withAuthGSSP();
