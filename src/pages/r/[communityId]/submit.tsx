import PageContent from "@/components/Layout/PageContent";
import NewPost from "@/components/Posts/NewPost";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const SubmitPostPage: React.FC = () => {
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        <NewPost />
      </>
      <>About</>
    </PageContent>
  );
};

export default SubmitPostPage;
