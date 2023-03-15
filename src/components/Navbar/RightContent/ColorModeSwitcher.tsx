import React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
  Button,
  Switch,
  Flex,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ColorModeSwitcher = (
  props: Omit<IconButtonProps, "aria-label">
) => {
  // const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex align="center">
      <Icon fontSize={20} mr={2} as={SwitchIcon} />
      <Text color="current" variant="ghost" onClick={toggleColorMode}>
        {`Switch to ${text} mode`}
      </Text>
    </Flex>

    // <IconButton
    //   // {...props}
    //   aria-label={`Switch to ${text} mode`}
    //   variant="ghost"
    //   color="current"
    //   marginLeft="2"
    //   onClick={toggleColorMode}
    //   icon={<SwitchIcon />}
    //   size="md"
    //   fontSize="lg"
    // />
  );
};
