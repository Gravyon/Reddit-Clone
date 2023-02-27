import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log("children", children);

  return (
    <Flex>
      <Flex>
        {/* Lefthand side */}
        {/* this needs to be expressed this way so typescript stops complaining */}
        <Flex>{children && children[0 as keyof typeof children]}</Flex>

        {/* Righthand side */}
        {/* this needs to be expressed this way so typescript stops complaining */}
        <Flex>{children && children[1 as keyof typeof children]}</Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
