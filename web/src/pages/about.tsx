import React from "react";
import Page from "@/layout/Page";
import { Center, HStack, Icon, Stack, Text, Button } from "@chakra-ui/react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import ExternalLink from "@/components/ExternalLink";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

const AboutPage = () => {
  return (
    <Page full showNav={false} showHeader={false}>
      <Center flex={1}>
        <Stack spacing={4} align="center">
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

          <Link href="/" passHref>
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="yellow"
              variant="ghost"
            >
              Volver al inicio
            </Button>
          </Link>
        </Stack>
      </Center>
    </Page>
  );
};

export default AboutPage;
