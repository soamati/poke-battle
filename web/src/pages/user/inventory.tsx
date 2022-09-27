import React from "react";
import Page from "@/layout/Page";
import withAuthGSSP from "@/lib/withAuthGSSP";
import UserInventory from "@/features/user/UserInventory";
import {
  Button,
  Center,
  Heading,
  Icon,
  Stack,
  useBoolean,
  Text,
} from "@chakra-ui/react";
import { FiShoppingCart, FiAlertTriangle } from "react-icons/fi";
import { RiSwordFill } from "react-icons/ri";
import Span from "@/components/Span";
import Link from "next/link";

export const getServerSideProps = withAuthGSSP();

const InventoryPage = () => {
  const [showAdvice, { toggle }] = useBoolean(true);

  return (
    <Page>
      <Stack pt={2} spacing={6}>
        <Heading size="md" textAlign="center">
          Inventario
        </Heading>

        <Heading size="sm" textAlign="center">
          Puedes consumir cualquier item en batalla
        </Heading>

        {showAdvice && (
          <Stack align="center">
            <Stack align="center">
              <Icon as={RiSwordFill} color="red.500" />
              <Text textAlign="center">
                Consume items en batalla para potenciar tus Pokémons
              </Text>
            </Stack>

            <Stack align="center">
              <Icon as={FiShoppingCart} color="green.500" />
              <Text textAlign="center">Compra items en la tienda</Text>
            </Stack>

            <Stack align="center">
              <Icon as={FiAlertTriangle} color="yellow.500" />
              <Text textAlign="center">
                Los items sólo se consumen al aplicarse, según el resultado de
                la{" "}
                <Link href="/battle/guide">
                  <Span fontWeight="semibold" cursor="pointer">
                    Ruleta de Batalla
                  </Span>
                </Link>
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

        <UserInventory />
      </Stack>
    </Page>
  );
};

export default InventoryPage;
