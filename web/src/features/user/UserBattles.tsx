import React from "react";
import NextLink from "next/link";
import client from "@/client";
import { useBattlesQuery } from "@/generated";
import {
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RiSwordFill } from "react-icons/ri";

type Props = {
  isPreview?: boolean;
};

const UserBattles = ({ isPreview }: Props) => {
  const { data } = useBattlesQuery(client);

  if (!data) {
    return (
      <Center p={2}>
        <Spinner />
      </Center>
    );
  }

  if (!data.battles.length) {
    return (
      <Stack align="center">
        <Text textAlign="center">Aún no has completado ninguna batalla</Text>
        <NextLink href="/battle" passHref>
          <Link fontWeight="semibold">Desafiar rival</Link>
        </NextLink>
      </Stack>
    );
  }

  return (
    <Stack>
      {data.battles.slice(0, isPreview ? 5 : undefined).map((battle) => (
        <Stack
          key={battle.id}
          borderWidth={1}
          borderColor={battle.winner === "USER" ? "green.400" : "red.400"}
          p={2}
          rounded="sm"
        >
          <Grid templateColumns="3fr 1fr 3fr">
            <GridItem>
              <Flex
                justify="start"
                align="center"
                gap="2"
                flexDir={["column", "row"]}
              >
                <Image
                  src={battle.selected.image}
                  alt={battle.selected.name}
                  boxSize="16"
                  objectFit="cover"
                />
                <Text fontSize={["sm", "md"]}>{battle.selected.name}</Text>
              </Flex>
            </GridItem>

            <GridItem>
              <Stack h="full" align="center" justify="center">
                <Icon
                  as={RiSwordFill}
                  color={battle.winner === "USER" ? "green.400" : "red.400"}
                />
                {battle.winner === "USER" ? (
                  <Text fontWeight="semibold" color="green.400" fontSize="sm">
                    VICTORIA
                  </Text>
                ) : (
                  <Text fontWeight="semibold" color="red.400" fontSize="sm">
                    DERROTA
                  </Text>
                )}
              </Stack>
            </GridItem>

            <GridItem>
              <Flex
                justify="end"
                align="center"
                gap="2"
                flexDir={["column-reverse", "row"]}
              >
                <Text fontSize={["sm", "md"]}>{battle.rival.name}</Text>
                <Image
                  src={battle.rival.image}
                  alt={battle.rival.name}
                  boxSize="16"
                  objectFit="cover"
                />
              </Flex>
            </GridItem>
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
};

export default UserBattles;
