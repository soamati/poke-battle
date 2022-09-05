import { useColorModeValue } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Marker = (_props: Props) => {
  const fill = useColorModeValue(
    "var(--chakra-colors-white)",
    "var(--chakra-colors-gray-800)"
  );

  const stroke = useColorModeValue(
    "var(--chakra-colors-gray-300)",
    "var(--chakra-colors-gray-600)"
  );

  return (
    <svg
      width="64"
      height="62"
      viewBox="0 0 64 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40.8584 56.0876C37.115 63.2344 26.885 63.2344 23.1416 56.0876L1.56298 14.8899C-1.92452 8.23156 2.90502 0.25 10.4214 0.25L53.5786 0.25C61.095 0.25 65.9245 8.23156 62.437 14.8899L40.8584 56.0876Z"
        fill={fill}
        stroke={stroke}
      />
    </svg>
  );
};

export default Marker;
