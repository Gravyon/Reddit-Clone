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
        {/* Left side */}
        {/* this needs to be expressed this way so typescript stops complaining */}
        {/* This is a type assertion. It's a way to tell TypeScript that you know better than it does what the type of something is. */}
        <Flex>{children && children[0 as keyof typeof children]}</Flex>

        {/* Right side */}
        {/* this needs to be expressed this way so typescript stops complaining */}
        {/* This is a type assertion. It's a way to tell TypeScript that you know better than it does what the type of something is. */}
        <Flex>{children && children[1 as keyof typeof children]}</Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
