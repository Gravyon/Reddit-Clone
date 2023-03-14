import { authModalState } from "@/atoms/authModalAtom";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const SignUp: React.FC = () => {
  const setModalAuthState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  //firebase
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Password doesn't match");
      console.log("Password doesn't match");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // UPDATE form state
    setSignUpForm((prev) => ({
      ...prev,
      // this takes the name given in the form, for example, name=email or name=password, then it knows what value it is
      [event.target.name]: event.target.value,
    }));
  };

  // solution for using functions without payment
  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    const newUser = {
      uid: userCred?.user.uid,
      email: userCred?.user.email,
      displayName: userCred?.user.displayName,
      providerData: userCred?.user.providerData,
    };
    if (userCred) {
      // JSON is needed here so typescript or firestore stop complaining
      createUserDocument(JSON.parse(JSON.stringify(newUser)));
    }
  }, [userCred]);

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
        onChange={onChange}
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
        onChange={onChange}
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
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
        onChange={onChange}
      />
      <Text textAlign="center" color="red" fontSize="10pt">
        {error ||
          FIREBASE_ERRORS[
            // this line here is "fixing a typescript error", basically typecasts the variable so typescript knows what type it is
            userError?.message as keyof typeof FIREBASE_ERRORS
          ]}
      </Text>

      <Button
        variant="signup"
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt">
        <Text mr={1}>Already a redditor?</Text>
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
      </Flex>
    </form>
  );
};
export default SignUp;
