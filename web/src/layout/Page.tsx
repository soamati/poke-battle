import React, { PropsWithChildren } from "react";
import Nav from "./Nav";
import { Container } from "@chakra-ui/react";
import Header from "./Header";

type Props = {
  full?: boolean;
  showNav?: boolean;
  showHeader?: boolean;
};

const Page = ({
  children,
  full = false,
  showNav = true,
  showHeader = true,
}: PropsWithChildren<Props>) => {
  return (
    <>
      {showHeader && <Header />}

      <Container
        maxW="container.md"
        minH={full ? "100vh" : "auto"}
        display="flex"
        flexDirection="column"
        pt={showHeader ? "12" : "0"}
        pb={showNav ? "24" : "0"}
      >
        {children}
      </Container>

      {showNav && <Nav />}
    </>
  );
};

export default Page;
