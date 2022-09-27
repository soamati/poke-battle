import React from "react";
import Page from "@/layout/Page";
import { Center, Text } from "@chakra-ui/react";
import withAuthGSSP from "@/lib/withAuthGSSP";

export const getServerSideProps = withAuthGSSP();

const AboutPage = () => {
  return (
    <Page full showNav={false}>
      <Center flex={1}>
        <Text>Aplicación creada con fines de aprendizaje</Text>
      </Center>
    </Page>
  );
};

export default AboutPage;
