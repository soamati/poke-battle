import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import Form from "src/components/Form";
import Page from "src/components/Page";
import useFocus from "src/hooks/useFocus";
import useInput from "src/hooks/useInput";
import withAuthGSSP from "src/lib/withAuthGSSP";
import NextLink from "next/link";

const SignupPage = () => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const { ref } = useFocus<HTMLInputElement>();

  // inputs
  const [username, onChangeUsername] = useInput();
  const [password, onChangePassword] = useInput();

  return (
    <Page full>
      <Center flex={1}>
        <Form w="full">
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
            <FormControl>
              <Input
                placeholder="usuario"
                variant="filled"
                ref={ref}
                value={username}
                onChange={onChangeUsername}
              />
              <FormHelperText>¿Quién eres?</FormHelperText>
            </FormControl>

            <FormControl>
              <Input
                placeholder="clave"
                variant="filled"
                value={password}
                onChange={onChangePassword}
              />
              <FormHelperText>No se la diré a nadie 🤫</FormHelperText>
            </FormControl>
            <Button colorScheme="yellow" type="submit">
              Entrar
            </Button>

            <Center>
              <NextLink href="/signin" passHref>
                <Link>Ya tengo cuenta</Link>
              </NextLink>
            </Center>
          </Stack>
        </Form>
      </Center>
    </Page>
  );
};

export default SignupPage;

export const getServerSideProps: GetServerSideProps = withAuthGSSP();
