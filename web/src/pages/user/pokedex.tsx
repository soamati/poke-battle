import React from "react";
import UserPokedex from "@/features/user/UserPokedex";
import Page from "@/layout/Page";
import withAuthGSSP from "@/lib/withAuthGSSP";
import {
  Button,
  Center,
  Heading,
  Icon,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { FiAlertTriangle, FiShoppingCart } from "react-icons/fi";
import { RiSwordFill } from "react-icons/ri";

export const getServerSideProps = withAuthGSSP();

const PokedexPage = () => {
  const [showAdvice, { toggle }] = useBoolean(true);

  return (
    <Page>
      <Stack pt={2} spacing={6}>
        <Heading size="md" textAlign="center">
          Pokédex
        </Heading>

        <Heading size="sm" textAlign="center">
          Puedes elegir cualquiera de tus Pokémons en batalla
        </Heading>

        {showAdvice && (
          <Stack align="center">
            <Stack align="center">
              <Icon as={RiSwordFill} color="red.500" />
              <Text textAlign="center">Captura Pokémons ganando batallas</Text>
            </Stack>

            <Stack align="center">
              <Icon as={FiShoppingCart} color="green.500" />
              <Text textAlign="center">Compra Pokémons en la tienda</Text>
            </Stack>

            <Stack align="center">
              <Icon as={FiAlertTriangle} color="yellow.500" />
              <Text textAlign="center">
                ¡Cuidado! Si pierdes en batalla, ya no contarás con el Pokémon
                seleccionado
              </Text>
            </Stack>
          </Stack>
        )}
        <Center>
          <Button
            onClick={toggle}
            size="xs"
            colorScheme="yellow"
            variant="ghost"
          >
            {showAdvice ? "Ocultar" : "Mostrar"} consejos
          </Button>
        </Center>

        <UserPokedex />
      </Stack>
    </Page>
  );
};

export default PokedexPage;
