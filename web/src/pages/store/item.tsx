import React from "react";
import Page from "@/components/Page";
import ItemStore from "@/features/store/ItemStore";
import withAuthGSSP from "@/lib/withAuthGSSP";
import { Stack } from "@chakra-ui/react";
import Cart from "@/features/store/Cart";
import CartProvider from "@/features/store/CartProvider";

type Props = {};

const ItemStorePage = (props: Props) => {
  return (
    <Page>
      <Stack py={8}>
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
