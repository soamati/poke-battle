import React from "react";
import {
  Box,
  Button,
  Center,
  Img,
  SimpleGrid,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useBattle } from "./BattleProvider";
import useColors from "@/hooks/useColors";
import ItemImage from "@/components/ItemImage";

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

  const { fg } = useColors();
  const [{ itemSlots, rivalSlots }, dispatch] = useBattle();

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
        <ArrowDownIcon boxSize={6} />
      </Center>

      <Center>
        <motion.div
          animate={controls}
          onAnimationComplete={() => {
            console.log(`El resultado es ${rotation}`);
          }}
        >
          <SimpleGrid columns={2} spacing={1} rounded="full" overflow="hidden">
            {/* User item A */}
            <Box
              w={size}
              h={size}
              bg="green.700"
              cursor="pointer"
              _hover={{ backgroundColor: fg }}
              onClick={() => dispatch({ type: "removeItem", payload: "a" })}
            >
              <Center h="full">
                {itemSlots.a !== null && (
                  <Stack align="center" ml="3" mt="3">
                    <ItemImage item={itemSlots.a} boxSize="20px" noPadding />
                    <Text fontWeight="semibold" fontSize="xs">
                      {itemSlots.a.name}
                    </Text>
                  </Stack>
                )}
              </Center>
            </Box>

            {/* Rival Items */}
            <Box w={size} h={size} bg="red.500">
              <Center h="full">
                {rivalSlots.a !== null && (
                  <Stack align="center" mr="3" mt="3">
                    <ItemImage item={rivalSlots.a} boxSize="20px" noPadding />
                    <Text fontWeight="semibold" fontSize="xs">
                      {rivalSlots.a.name}
                    </Text>
                  </Stack>
                )}
              </Center>
            </Box>

            <Box w={size} h={size} bg="red.500">
              <Center h="full">
                {rivalSlots.b !== null && (
                  <Stack align="center" ml="3" mb="3">
                    <Text fontWeight="semibold" fontSize="xs">
                      {rivalSlots.b.name}
                    </Text>
                    <ItemImage item={rivalSlots.b} boxSize="20px" noPadding />
                  </Stack>
                )}
              </Center>
            </Box>

            {/* User item B */}
            <Box
              w={size}
              h={size}
              bg="green.700"
              cursor="pointer"
              _hover={{ backgroundColor: fg }}
              onClick={() => dispatch({ type: "removeItem", payload: "b" })}
            >
              <Center h="full">
                {itemSlots.b !== null && (
                  <Stack align="center" mr="3" mb="3">
                    <Text fontWeight="semibold" fontSize="xs">
                      {itemSlots.b.name}
                    </Text>
                    <ItemImage item={itemSlots.b} boxSize="20px" noPadding />
                  </Stack>
                )}
              </Center>
            </Box>
          </SimpleGrid>
        </motion.div>
      </Center>

      <Center>
        <Button onClick={start} isDisabled={isSpinning}>
          Girar
        </Button>
      </Center>
    </Stack>
  );
};

export default Roulette;
