import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Input,
  Checkbox,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    //calculate remaining characters
    // substracts from current entered string
    setCharsRemaining(21 - e.target.value.length);
  };

  const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection={"column"}
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDirection="column"
              padding={"10px 0px"}
            >
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color={"gray.500"}>
                Community names including capitalization cannot be changed
              </Text>

              <Text
                position={"relative"}
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position={"relative"}
                value={communityName}
                size="sm"
                pl={"22px"}
                onChange={handleChange}
              ></Input>
              <Text
                fontSize={"9pt"}
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon color="gray.500" mr={1} as={BsFillPersonFill} />
                      <Text fontWeight={600} fontSize={"10pt"} mr={1}>
                        Public
                      </Text>
                      <Text fontSize={"8pt"}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon color="gray.500" mr={1} as={MdRemoveRedEye} />
                      <Text fontWeight={600} fontSize={"10pt"} mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize={"8pt"}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon color="gray.500" mr={1} as={FaLock} />
                      <Text fontWeight={600} fontSize={"10pt"} mr={1}>
                        Private
                      </Text>
                      <Text fontSize={"8pt"}>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              colorScheme="blue"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button height="30px" onClick={() => {}}>
              Create community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
