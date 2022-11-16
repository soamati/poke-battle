import React from "react";
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import client from "@/client";
import Form from "@/components/Form";
import { useSigninMutation } from "@/generated";
import useErrorParser from "@/hooks/useErrorParser";
import useFocus from "@/hooks/useFocus";
import useInput from "@/hooks/useInput";
import withAuthGSSP from "@/lib/withAuthGSSP";
import { useRouter } from "next/router";
import Page from "@/layout/Page";

type Props = {};

const fields = ["username", "password"];

const SigninPage = (_props: Props) => {
  const router = useRouter();
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const { ref } = useFocus<HTMLInputElement>();

  // inputs
  const [username, onChangeUsername] = useInput();
  const [password, onChangePassword] = useInput();

  const { mutate, isLoading } = useSigninMutation(client);
  const { parser, errors } = useErrorParser(fields, { withToast: true });

  const onSignin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { data: { username, password } },
      {
        onSuccess: () => router.push("/"),
        onError: (error: any) => parser(error),
      }
    );
  };

  return (
    <Page full showHeader={false} showNav={false}>
      <Center flex={1}>
        <Form onSubmit={onSignin} w="full">
          <Stack
            w={["full", "sm"]}
            spacing={6}
            borderColor={borderColor}
            borderWidth={1}
            boxShadow="md"
            p={6}
            rounded="md"
            mx="auto"
          >
            <Heading size="md" textAlign="center">
              Bienvenido
            </Heading>
            <FormControl isInvalid={errors.username !== undefined}>
              <Input
                placeholder="usuario"
                variant="filled"
                ref={ref}
                value={username}
                onChange={onChangeUsername}
              />
              <FormHelperText>¿Quién eres?</FormHelperText>
              <FormErrorMessage>
                {errors.username && errors.username[0]}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password !== undefined}>
              <Input
                placeholder="clave"
                variant="filled"
                value={password}
                onChange={onChangePassword}
                type="password"
              />
              <FormHelperText>No se la diré a nadie 🤫</FormHelperText>
              <FormErrorMessage>
                {errors.password && errors.password[0]}
              </FormErrorMessage>
            </FormControl>
            <Button colorScheme="yellow" type="submit" isLoading={isLoading}>
              Entrar
            </Button>

            <Center>
              <NextLink href="/signup" passHref>
                <Link>No tengo cuenta</Link>
              </NextLink>
            </Center>
          </Stack>
        </Form>
      </Center>
    </Page>
  );
};

export default SigninPage;

export const getServerSideProps: GetServerSideProps = withAuthGSSP();
