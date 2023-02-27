import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CommunityNotFound: React.FC = () => {
  return (
    <Flex
      direction={"column"}
      justifyContent="center"
      alignItems={"center"}
      minHeight="60vh"
    >
      <Text color="gray.700" fontSize={"18px"}>
        Sorry, there aren't any communities on Reddit with that name.
      </Text>
      <Text color="gray.800" mt={4} fontSize="14px">
        This community may have been banned or the community name is incorrect.
      </Text>
      <Link href="/">
        <Button mt={4}>GO HOME</Button>
      </Link>
    </Flex>
  );
};

export default CommunityNotFound;
