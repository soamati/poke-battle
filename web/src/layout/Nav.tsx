import React, { PropsWithChildren, useMemo } from "react";
import Link from "next/link";
import useColors from "@/hooks/useColors";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { RiSwordFill } from "react-icons/ri";
import { MdCatchingPokemon } from "react-icons/md";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

type ItemProps = {
  href: string;
  icon: IconType;
};

const NavItem = ({ children, href, icon }: PropsWithChildren<ItemProps>) => {
  const { pathname } = useRouter();

  const _ = useMemo(() => {
    return href === pathname ? "yellow.300" : undefined;
  }, [href, pathname]);

  if (typeof children !== "string") {
    return null;
  }

  return (
    <Link href={href} passHref>
      <Stack cursor="pointer" align="center" justify="center" flex={1}>
        <Icon as={icon} />
        <Text fontSize="sm">{children}</Text>
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
        mb="2"
        h="16"
        justify="space-around"
        boxShadow="lg"
        zIndex={10}
      >
        <NavItem href="/" icon={RiSwordFill}>
          Batalla
        </NavItem>
        <NavItem href="/" icon={MdCatchingPokemon}>
          Pokédex
        </NavItem>
        <NavItem href="/store/pokemon" icon={FiShoppingCart}>
          Tienda
        </NavItem>
        <NavItem href="/" icon={FiUser}>
          Perfil
        </NavItem>
      </Flex>
    </Box>
  );
};

export default Nav;