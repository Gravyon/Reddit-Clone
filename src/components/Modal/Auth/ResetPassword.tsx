import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const setModalAuthState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendPasswordResetEmail(email);
    setSuccess(true);
    setEmail("");
  };
  return (
    <Flex
      mb={10}
      //   mt={10}
      flexDirection={"column"}
      width={"100%"}
    >
      {/* <Text fontWeight={700}>Reset your password</Text> */}
      <Text fontSize="9pt" mb={2}>
        Tell us the email address associated with your Reddit account, and we'll
        send you an email with a link to reset your password.
      </Text>
      <form onSubmit={onSubmit}>
        <Input
          borderRadius="60px"
          required
          name="email"
          placeholder="email"
          type="email"
          mb={2}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button
          variant="signup"
          width="100%"
          height="36px"
          mt={2}
          mb={2}
          type="submit"
          isLoading={sending}
        >
          Reset password
        </Button>
      </form>
      {success ? (
        <Flex m={3} fontSize="9pt">
          <Text textColor="blue.400" fontWeight={700}>
            Thanks! If your Reddit username and email address match, you'll get
            an email with a link to reset your password shortly.
          </Text>{" "}
        </Flex>
      ) : (
        <></>
      )}
      <Flex mt={5} fontSize="9pt">
        <Text
          as="u"
          textColor="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setModalAuthState((prev) => ({ ...prev, view: "login" }))
          }
        >
          Log In
        </Text>
        <Text ml={1} textColor="blue.500" fontWeight={700}>
          •
        </Text>
        <Text
          as="u"
          ml={1}
          textColor="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setModalAuthState((prev) => ({ ...prev, view: "signup" }))
          }
        >
          Sign Up
        </Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;
