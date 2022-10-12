import React from "react";
import NextLink from "next/link";
import Stats from "./Stats";
import { Stack, HStack, Avatar, Text, Button } from "@chakra-ui/react";
import useColors from "@/hooks/useColors";
import { User, useSignoutMutation } from "@/generated";
import client from "@/client";
import { useRouter } from "next/router";

type Props = {
  user: User;
};

const Profile = ({ user }: Props) => {
  const router = useRouter();
  const { fg } = useColors();

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
    <Stack spacing={6} borderWidth={1} borderColor={fg} p={[2, 4]} rounded="sm">
      <HStack justify="space-between">
        <HStack>
          <Avatar size="sm" name={user.username} />
          <Text fontWeight="bold">{user.username}</Text>
        </HStack>

        <Button
          size="sm"
          onClick={onSignout}
          colorScheme="red"
          variant="ghost"
          isLoading={isLoading}
        >
          Salir
        </Button>
      </HStack>

      <Stats />

      <HStack justify="space-between" pt="4">
        <NextLink href="/battle/guide">
          <Button size={["xs", "sm"]} colorScheme="yellow">
            Guía de Batalla
          </Button>
        </NextLink>
        <NextLink href="/about">
          <Button size={["xs", "sm"]}>Acerca de PokéBattle</Button>
        </NextLink>
      </HStack>
    </Stack>
  );
};

export default Profile;
