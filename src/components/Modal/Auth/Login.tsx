import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setModalAuthState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  //firebase
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // UPDATE form state
    setLoginForm((prev) => ({
      ...prev,
      // this takes the name given in the form, for example, name=email or name=password, then it knows what value it is
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        // bg="gray.50"
        onChange={() => {
          onChange;
        }}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          // bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        // bg="gray.50"
        onChange={() => {
          onChange;
        }}
      />
      <Text textAlign="center" color="red" fontSize="10pt">
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Flex mt={3} mb={3} fontSize="9pt" justifyContent="center">
        <Text>Forgot your</Text>
        <Text
          as="u"
          ml={1}
          textColor="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setModalAuthState((prev) => ({ ...prev, view: "resetPassword" }))
          }
        >
          username
        </Text>
        <Text ml={1}>or</Text>
        <Text
          as="u"
          ml={1}
          textColor="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setModalAuthState((prev) => ({ ...prev, view: "resetPassword" }))
          }
        >
          password
        </Text>
        <Text ml={1}>?</Text>
      </Flex>
      <Button
        variant="signup"
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
      >
        Log In
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New to Reddit?</Text>
        <Text
          as="u"
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
    </form>
  );
};
export default Login;
