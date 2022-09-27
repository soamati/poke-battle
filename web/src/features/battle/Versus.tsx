import React from "react";
import Contender from "./Contender";
import SelectPlaceholder from "./SelectPlaceholder";
import { Flex, Center, Icon } from "@chakra-ui/react";
import { RiSwordFill } from "react-icons/ri";
import { useBattle } from "./BattleProvider";
import { Pokemon } from "@/generated";

type Props = {
  rival: Pokemon;
};

const Versus = ({ rival }: Props) => {
  const [{ selected }] = useBattle();

  return (
    <Flex gap={2} flexDir={["column", "row"]}>
      {selected ? <Contender pokemon={selected} /> : <SelectPlaceholder />}
      <Center>
        <Icon as={RiSwordFill} />
      </Center>
      <Contender pokemon={rival} isRival />
    </Flex>
  );
};

export default Versus;
