import React from "react";
import client from "@/client";
import { useUserStatQuery } from "@/generated";
import {
  Center,
  ColorProps,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RiSwordFill } from "react-icons/ri";

type StatItemProps = {
  title: string;
  color: ColorProps["color"];
  value: number;
  isPercent?: boolean;
};

const StatItem = ({ title, color, value, isPercent }: StatItemProps) => {
  return (
    <Stack align="center">
      <Heading size="sm" color={color}>
        {title}
      </Heading>
      <Icon as={RiSwordFill} color={color} />
      <Text fontWeight="semibold" color={color}>
        {value}
        {isPercent && "%"}
      </Text>
    </Stack>
  );
};

const Stats = () => {
  const { data } = useUserStatQuery(client);

  if (!data) {
    return (
      <Center p="4">
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack align="center" spacing={6}>
      <Stack align="center">
        <Heading size="sm">PORCENTAJE DE VICTORIAS</Heading>
        <Icon as={RiSwordFill} />
        <Text fontWeight="semibold">{data.userStat.battleStat.winRate}%</Text>
      </Stack>

      <SimpleGrid columns={3} w="full">
        <StatItem
          title="VICTORIAS"
          color="green.400"
          value={data.userStat.battleStat.winCount}
        />
        <StatItem
          title="TOTAL"
          color="yellow.400"
          value={data.userStat.battleStat.allCount}
        />
        <StatItem
          title="DERROTAS"
          color="red.400"
          value={data.userStat.battleStat.loseCount}
        />
      </SimpleGrid>
    </Stack>
  );
};

export default Stats;
