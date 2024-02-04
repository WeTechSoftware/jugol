import { Button, HStack, Image, Text, useToast, VStack } from "native-base";
import React, { useState } from "react";

import Logo from "@images/logo1.png";
import { fontSizes } from "@typography";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import OrText from "@ui/OrText/OrText";

import { useNavigation } from "@react-navigation/native";

import { authRoutes } from "@routes/index";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import SocialIconButton from "@ui/SocialIconButton/SocialIconButton";
import { useDispatch, useSelector } from "react-redux";

import { useCheckUserMutation } from "@store/api/authApi/authApiSlice";
import AppleSignIn from "./AppleSignIn";
import GoogleSignInButton from "./GoogleSignInButton";
import FacebookButton from "./FacebookButton";

export default function SelectAuthMethodScreen() {
  const navigation = useNavigation();
  const authMethodType = useSelector((user: any) => user.user.authMethodType);

  return (
    <KeyboardAwareView>
      <Image mx={"auto"} source={Logo} alt="Logo" />

      <VStack>
        <Text fontSize={fontSizes.lg} mx="auto" fontWeight={"bold"}>
          {authMethodType === "signup" ? "Sign up" : "Sign in"} to continue
        </Text>
        <VStack mt={8} space="4">
          <Button
            onPress={() =>
              navigation.navigate(
                authMethodType === "signup"
                  ? (authRoutes.signup.path as never)
                  : (authRoutes.login.path as never)
              )
            }
            w="full"
            px={0}
            variant="primary"
          >
            Continue with email
          </Button>
          <Button
            onPress={() =>
              navigation.navigate(
                authRoutes.phoneInputScreen.path as never,
                {
                  type: authMethodType,
                } as never
              )
            }
            w="full"
            px={0}
            variant="outline"
          >
            Continue with phone
          </Button>
        </VStack>
        <OrText mt={10} />
        <HStack space="5" justifyContent={"center"} mt={6}>
          <GoogleSignInButton />
          <FacebookButton />
          <AppleSignIn />
        </HStack>
      </VStack>

      <HStack space="4" mb={4} justifyContent={"center"}>
        <Text fontSize={fontSizes.sm} color={"dark.100"}>
          Terms of use
        </Text>
        <Text fontSize={fontSizes.sm} color={"dark.100"}>
          Privacy Policy
        </Text>
      </HStack>
    </KeyboardAwareView>
  );
}
