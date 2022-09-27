import React, { PropsWithChildren, useMemo } from "react";
import Link from "next/link";
import useColors from "@/hooks/useColors";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { RiSwordFill } from "react-icons/ri";
import { MdCatchingPokemon } from "react-icons/md";
import { FiHome, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

type ItemProps = {
  href: string;
  icon: IconType;
};

const NavItem = ({ children, href, icon }: PropsWithChildren<ItemProps>) => {
  const { pathname } = useRouter();

  const color = useMemo(() => {
    return href === pathname ? "yellow.300" : undefined;
  }, [href, pathname]);

  if (typeof children !== "string") {
    return null;
  }

  return (
    <Link href={href} passHref>
      <Stack cursor="pointer" align="center" justify="center" flex={1}>
        <Icon as={icon} color={color} />
        <Text fontSize="sm" color={color}>
          {children}
        </Text>
      </Stack>
    </Link>
  );
};

const Nav = () => {
  const { bg, fg } = useColors();

  return (
    <Box position="fixed" bottom="0" left="0" right="0">
      <Flex
        bg={bg}
        borderWidth={1}
        borderColor={fg}
        rounded="sm"
        maxW="container.sm"
        mx="auto"
        mb={["0", "2"]}
        h="16"
        justify="space-around"
        boxShadow="lg"
        zIndex={10}
      >
        <NavItem href="/" icon={FiHome}>
          Inicio
        </NavItem>
        <NavItem href="/battle" icon={RiSwordFill}>
          Batalla
        </NavItem>
        <NavItem href="/user/pokedex" icon={MdCatchingPokemon}>
          Pokédex
        </NavItem>
        <NavItem href="/store/pokemon" icon={FiShoppingCart}>
          Tienda
        </NavItem>
      </Flex>
    </Box>
  );
};

export default Nav;
