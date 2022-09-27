import React from "react";
import ItemImage from "@/components/ItemImage";
import useColors from "@/hooks/useColors";
import { InventoryQuery } from "@/generated";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  HStack,
  Tag,
  Text,
  IconButton,
  Stack,
  useBoolean,
  Box,
} from "@chakra-ui/react";
import ItemDescription from "@/components/ItemDescription";

type Props = {
  item: InventoryQuery["inventory"][number]["item"];
  units: InventoryQuery["inventory"][number]["units"];
};

const InventoryItem = ({ item, units }: Props) => {
  const [showDesc, { toggle }] = useBoolean(false);
  const { fg } = useColors();

  return (
    <Stack borderWidth={1} borderColor={fg} p={2} rounded="sm">
      <HStack justify="space-between">
        <HStack>
          <ItemImage item={item} boxSize="5" />
          <Text>{item.name}</Text>
        </HStack>

        <HStack spacing={1}>
          <Tag colorScheme="yellow">Tienes: {units}</Tag>
          <IconButton
            aria-label="Info"
            icon={<QuestionOutlineIcon />}
            variant="ghost"
            size="xs"
            colorScheme="cyan"
            onClick={toggle}
          />
        </HStack>
      </HStack>

      {showDesc && (
        <Box>
          <ItemDescription item={item} />
        </Box>
      )}
    </Stack>
  );
};

export default InventoryItem;
