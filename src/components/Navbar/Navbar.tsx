import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="reddit-face" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="reddit-text"
          height="46px"
          // unset is basically the opposite of display: none
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <SearchInput />
      {/* <Directory />
      <RightContent /> */}
      <RightContent />
    </Flex>
  );
};
export default Navbar;
