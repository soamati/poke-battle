import { useColorModeValue } from "@chakra-ui/react";

type Colors = {
  bg: string;
  fg: string;
};

export default function useColors() {
  const colors = useColorModeValue<Colors, Colors>(
    { bg: "white", fg: "gray.300" },
    { bg: "gray.800", fg: "gray.600" }
  );

  return colors;
}
