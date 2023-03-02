import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TabItem } from "./NewPost";

type TabItemProps = {
  tab: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({ tab, selected, setSelectedTab }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      fontWeight={700}
      _hover={{ bg: "gray.100" }}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottom={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      onClick={() => setSelectedTab(tab.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={tab.icon} />
      </Flex>
      <Text fontSize={"10pt"}>{tab.title}</Text>
    </Flex>
  );
};

export default TabItem;
