import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import {
  useSignInWithApple,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);
  const [signInWithApple, userApple, loadingApple, errorApple] =
    useSignInWithApple(auth);
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
        isLoading={loadingApple}
        onClick={() => signInWithApple()}
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
