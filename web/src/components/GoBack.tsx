import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

const GoBack = () => {
  const router = useRouter();

  return (
    <Box position="absolute" top={16} right={4}>
      <IconButton
        aria-label="Modo oscuro"
        icon={<ArrowBackIcon />}
        onClick={() => router.back()}
      />
    </Box>
  );
};

export default GoBack;
