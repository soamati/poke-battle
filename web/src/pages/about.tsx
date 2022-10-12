import React from "react";
import Page from "@/layout/Page";
import {
  Center,
  HStack,
  Icon,
  Stack,
  Text,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import ExternalLink from "@/components/ExternalLink";
import Link from "next/link";

const AboutPage = () => {
  return (
    <Page full showNav={false} showHeader={false}>
      <Center flex={1}>
        <Stack spacing={6} align="center">
          <Stack>
            <Text textAlign="center" color="gray.400">
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

          <Stack>
            <Text textAlign="center" color="gray.400">
              Fuentes de información:
            </Text>
            <HStack justify="center" spacing={4}>
              <ExternalLink href="https://pokeapi.co/">
                <ChakraLink>PokéAPI</ChakraLink>
              </ExternalLink>
              <ExternalLink href="https://pokemon.fandom.com/es/wiki/Primera_generación">
                <ChakraLink>WikiDex</ChakraLink>
              </ExternalLink>
              <ExternalLink href="https://github.com/soamati/poke-parser">
                <ChakraLink>WebScraper</ChakraLink>
              </ExternalLink>
            </HStack>
          </Stack>

          <Link href="/" passHref>
            <Button colorScheme="yellow" variant="ghost" size="sm">
              Volver al inicio
            </Button>
          </Link>
        </Stack>
      </Center>
    </Page>
  );
};

export default AboutPage;
