import React from "react";
import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { ArrowDownIcon } from "@chakra-ui/icons";

const size = "100px";

const rotations = {
  1: 45,
  2: -45,
  3: 135,
  4: -135,
};

type RotationsKey = keyof typeof rotations;

function getRotation() {
  const result = Math.floor(Math.random() * 4 + 1) as RotationsKey;

  return rotations[result];
}

const Roulette = () => {
  const controls = useAnimation();
  const [isSpinning, { on, off }] = useBoolean(false);
  const [rotation] = React.useState(() => getRotation());

  const start = React.useCallback(async () => {
    on();
    await controls.start({
      rotate: 360 * 10 + rotation,
      transition: { ease: "easeInOut", duration: 5 },
    });
    setTimeout(() => {
      controls.set({ rotate: 0 });
      off();
    }, 3000);
  }, [controls, on, off, rotation]);

  return (
    <Stack spacing={4}>
      <Center>
        <motion.div
          animate={{ scale: 1.25 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
          <ArrowDownIcon boxSize={6} />
        </motion.div>
      </Center>
      <motion.div
        animate={controls}
        onAnimationComplete={() => {
          console.log(`El resultado es ${rotation}`);
        }}
      >
        <SimpleGrid columns={2} spacing={1} rounded="full" overflow="hidden">
          <Box w={size} h={size} bg="green.400">
            <Center h="full">
              <Text>1</Text>
            </Center>
          </Box>
          <Box w={size} h={size} bg="red.400">
            <Center h="full">
              <Text>2</Text>
            </Center>
          </Box>
          <Box w={size} h={size} bg="green.400">
            <Center h="full">
              <Text>3</Text>
            </Center>
          </Box>
          <Box w={size} h={size} bg="red.400">
            <Center h="full">
              <Text>4</Text>
            </Center>
          </Box>
        </SimpleGrid>
      </motion.div>

      <Center>
        <Button onClick={start} isDisabled={isSpinning}>
          Girar
        </Button>
      </Center>
    </Stack>
  );
};

export default Roulette;
