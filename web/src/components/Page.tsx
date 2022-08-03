import React, { PropsWithChildren } from "react";
import { Container } from "@chakra-ui/react";

type Props = {
  full?: boolean;
};

const Page = ({ children, full = false }: PropsWithChildren<Props>) => {
  return (
    <Container
      maxW="container.md"
      minH={full ? "100vh" : "auto"}
      display="flex"
      flexDirection="column"
    >
      {children}
    </Container>
  );
};

export default Page;
