import React from "react";
import { Box, Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import useColors from "@/hooks/useColors";
import { MdCatchingPokemon } from "react-icons/md";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useSignoutMutation } from "@/generated";
import client from "@/client";
import ToggleColorMode from "@/components/ToggleColorMode";

type Props = {};

const Header = (_props: Props) => {
  const router = useRouter();
  const { bg, fg } = useColors();

  const { mutate, isLoading } = useSignoutMutation(client);

  const onSignout = () => {
    mutate(
      {},
      {
        onSuccess() {
          router.push("/signin");
        },
      }
    );
  };

  return (
    <Box
      bg={bg}
      borderBottomWidth={1}
      borderColor={fg}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={10}
    >
      <Flex mx="4" my="1" justify="space-between">
        <HStack cursor="pointer">
          <Icon as={MdCatchingPokemon} />
          <Text size="sm">PokéBattle</Text>
        </HStack>

        <HStack spacing="4">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
          >
            Volver
          </Button>
          <ToggleColorMode />
          <Button
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={onSignout}
            isLoading={isLoading}
          >
            Salir
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
