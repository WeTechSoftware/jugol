import { useToast } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import { authRoutes } from "@routes/index";
import SocialIconButton from "@ui/SocialIconButton/SocialIconButton";
import { useDispatch } from "react-redux";
import * as Crypto from "expo-crypto";
import { Platform } from "react-native";
import { useCheckUserMutation } from "@store/api/authApi/authApiSlice";
import {
  login,
  setCheckUserInformation,
  setUID,
} from "@store/features/auth/authSlice";

export default function AppleSignIn() {
  const toast = useToast();
  const dispatch = useDispatch();
  const [checkUser, results] = useCheckUserMutation();
  const navigation = useNavigation();

  const handleAppleSignin = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error("Apple Sign-In failed - no identify token returned");
    }

    // check a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );

    // Sign the user in with the credential
    await auth().signInWithCredential(appleCredential);
    const iDToken = await auth().currentUser?.getIdToken();
    const user = auth().currentUser;
    dispatch(setUID(user?.uid));
    dispatch(login(iDToken));
    const results = await checkUser(user?.uid).unwrap();
    const {
      hasUpdatedGender,
      hasUpdatedAddress,
      hasUpdatedProfile,
      hasUpdatedInterest,
      isNewUser,
    } = results.data;
    if (
      !hasUpdatedGender ||
      !hasUpdatedAddress ||
      !hasUpdatedProfile ||
      !hasUpdatedInterest ||
      isNewUser
    ) {
      navigation.navigate(authRoutes.selectGenderScreen.path as never);
    } else {
      navigation.navigate(authRoutes.bottomTab.path as never);
      dispatch(setCheckUserInformation(false));
    }
  };

  async function onAppleButtonPress() {
    // Generate secure, random values for state and nonce
    const rawNonce = Crypto.randomUUID() as string;
    const state = Crypto.randomUUID() as string;

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: "com.jugol.ad",

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: "https://jugal-api.onrender.com/auth/apple",

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const { id_token, nonce } = await appleAuthAndroid.signIn();

    // check a Firebase credential from the response
    const appleCredential = auth.AppleAuthProvider.credential(id_token, nonce);

    // Sign the user in with the credential
    await auth().signInWithCredential(appleCredential);

    const iDToken = await auth().currentUser?.getIdToken();
    const user = auth().currentUser;
    dispatch(setUID(user?.uid));
    dispatch(login(iDToken));
    const results = await checkUser(user?.uid).unwrap();
    const {
      hasUpdatedGender,
      hasUpdatedAddress,
      hasUpdatedProfile,
      hasUpdatedInterest,
      isNewUser,
    } = results.data;

    if (
      !hasUpdatedGender ||
      !hasUpdatedAddress ||
      !hasUpdatedProfile ||
      !hasUpdatedInterest ||
      isNewUser
    ) {
      navigation.navigate(authRoutes.selectGenderScreen.path as never);
      dispatch(setCheckUserInformation(true));
    } else {
      navigation.navigate(authRoutes.bottomTab.path as never);
      dispatch(setCheckUserInformation(false));
    }
  }
  return (
    <SocialIconButton
      icon="apple1"
      onPress={Platform.OS === "ios" ? handleAppleSignin : onAppleButtonPress}
    />
  );
}
