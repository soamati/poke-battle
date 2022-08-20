import React from "react";
import useColors from "@/hooks/useColors";
import { Box, Center, HStack, Spinner, Text } from "@chakra-ui/react";

type Props = {};

const SelectPlaceholder = (props: Props) => {
  const { fg } = useColors();
  return (
    <Box p={2} flex={1} borderWidth={1} borderColor={fg} rounded="sm">
      <Center h="full">
        <HStack>
          <Text>Eligiendo</Text>
          <Spinner size="sm" />
        </HStack>
      </Center>
    </Box>
  );
};

export default SelectPlaceholder;
