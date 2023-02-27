import { auth, firestore } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import {
  useSignInWithApple,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
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
    <Flex direction="column" width="100%" mb={4}>
      <Button
        isLoading={loadingGoogle}
        onClick={() => signInWithGoogle()}
        variant="oauth"
        mb={2}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Button
        // isLoading={loadingApple}
        onClick={() => {}}
        variant="oauth"
        mb={2}
      >
        <Image src="/images/apple.svg" height="20px" mr={4} />
        Continue with Apple
      </Button>
      {errorGoogle && <Text>{errorGoogle.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
