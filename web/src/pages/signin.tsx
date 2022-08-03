import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import client from "src/client";
import Form from "src/components/Form";
import Page from "src/components/Page";
import { useSigninMutation, WhoamiDocument, WhoamiQuery } from "src/generated";
import useErrorParser from "src/hooks/useErrorParser";
import useFocus from "src/hooks/useFocus";
import useInput from "src/hooks/useInput";

type Props = {};

const fields = ["username", "password"];

const SigninPage = (props: Props) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const { ref } = useFocus<HTMLInputElement>();

  // inputs
  const [username, onChangeUsername] = useInput();
  const [password, onChangePassword] = useInput();

  const { mutate, isLoading } = useSigninMutation(client);
  const { parser, errors } = useErrorParser(fields);

  const onSignin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { data: { username, password } },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error: any) => {
          parser(error);
        },
      }
    );
  };

  return (
    <Page full>
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
              />
              <FormHelperText>No se la diré a nadie 🤫</FormHelperText>
              <FormErrorMessage>
                {errors.password && errors.password[0]}
              </FormErrorMessage>
            </FormControl>
            <Button colorScheme="yellow" type="submit" isLoading={isLoading}>
              Entrar
            </Button>
          </Stack>
        </Form>
      </Center>
    </Page>
  );
};

export default SigninPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { cookie } = req.headers;

    const res = (await client.request(WhoamiDocument, {}, {
      cookie,
    } as HeadersInit)) as WhoamiQuery;

    return {
      props: {
        user: res.whoami,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
      },
    };
  }
};
