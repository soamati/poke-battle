import React from "react";
import ItemImage from "@/components/ItemImage";
import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Text,
  Center,
  SimpleGrid,
  Button,
  useBoolean,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useBattle } from "@/features/battle/BattleProvider";
import useColors from "@/hooks/useColors";
import { PossibleResult } from "./types";

const size = "100px";

const possibleResults: PossibleResult[] = [
  {
    winner: "user",
    slot: "a",
    rotation: 45,
  },
  {
    winner: "user",
    slot: "b",
    rotation: -135,
  },
  {
    winner: "rival",
    slot: "a",
    rotation: -45,
  },
  {
    winner: "rival",
    slot: "b",
    rotation: 135,
  },
];

function getResult() {
  const result = Math.floor(Math.random() * 4);
  return possibleResults[result];
}

type Props = {
  setResult: (result: PossibleResult) => void;
  setView: (view: "result" | "spin") => void;
};

const SpinView = ({ setResult, setView }: Props) => {
  const controls = useAnimation();
  const [isSpinning, { on, off }] = useBoolean(false);
  const { fg } = useColors();
  const [{ itemSlots, rivalSlots }, dispatch] = useBattle();

  const handleSpin = React.useCallback(async () => {
    on();
    const currentResult = getResult();
    setResult(currentResult);

    await controls.start({
      rotate: 360 * 10 + currentResult.rotation,
      transition: { ease: "easeInOut", duration: 5 },
    });

    setTimeout(() => {
      controls.set({ rotate: 0 });
      off();
      setView("result");
    }, 3000);
  }, [controls, on, off, setResult, setView]);

  return (
    <Stack spacing={4}>
      <Center>
        <ArrowDownIcon boxSize={6} />
      </Center>

      <Center>
        <motion.div animate={controls}>
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
        <Button onClick={handleSpin} isDisabled={isSpinning}>
          Girar
        </Button>
      </Center>
    </Stack>
  );
};

export default SpinView;
