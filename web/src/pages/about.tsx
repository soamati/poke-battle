import React from "react";
import Page from "@/layout/Page";
import { Center, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import withAuthGSSP from "@/lib/withAuthGSSP";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import ExternalLink from "@/components/ExternalLink";

export const getServerSideProps = withAuthGSSP();

const AboutPage = () => {
  return (
    <Page full showNav={false}>
      <Center flex={1}>
        <Stack spacing={4}>
          <Text textAlign="center">
            Aplicación creada con fines de aprendizaje
          </Text>

          <Text textAlign="center">Matias Ruiz</Text>

          <HStack justify="center" spacing={4}>
            <ExternalLink href="https://github.com/soamati">
              <Icon as={FiGithub} cursor="pointer" />
            </ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/matiruizsh/">
              <Icon as={FiLinkedin} cursor="pointer" />
            </ExternalLink>
          </HStack>
        </Stack>
      </Center>
    </Page>
  );
};

export default AboutPage;
