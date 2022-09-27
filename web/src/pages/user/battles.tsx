import React from "react";
import Page from "@/layout/Page";
import withAuthGSSP from "@/lib/withAuthGSSP";
import UserBattles from "@/features/user/UserBattles";
import {
  Button,
  Center,
  Heading,
  Text,
  Icon,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import { FiShoppingCart, FiAlertTriangle } from "react-icons/fi";
import { RiSwordFill } from "react-icons/ri";

export const getServerSideProps = withAuthGSSP();

const BattlesPage = () => {
  const [showAdvice, { toggle }] = useBoolean(true);

  return (
    <Page>
      <Stack pt={2} spacing={6}>
        <Heading size="md" textAlign="center">
          Batallas
        </Heading>

        <Heading size="sm" textAlign="center">
          Revisa tu historial de batallas
        </Heading>

        {showAdvice && (
          <Stack align="center">
            <Stack align="center">
              <Icon as={RiSwordFill} color="red.500" />
              <Text textAlign="center">
                En batalla, elige tu Pokémon analizando las estadísticas del
                rival
              </Text>
            </Stack>

            <Stack align="center">
              <Icon as={FiShoppingCart} color="green.500" />
              <Text textAlign="center">
                Si no puedes vencer un rival para capturarlo, puedes comprarlo
                en la tienda
              </Text>
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

        <UserBattles />
      </Stack>
    </Page>
  );
};

export default BattlesPage;
