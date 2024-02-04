import { HStack, Image, Pressable, Text, VStack } from "native-base";
import React from "react";
import LOGO from "@images/logo.png";
import { useWindowDimensions } from "react-native";
import requestCameraAndAudioPermission from "./components/Permission";
import * as Linking from "expo-linking";
import { useNavigation, useRoute } from "@react-navigation/native";
import { store } from "@store/index";
import { callApiSlice } from "@store/api/callApi/callApiSlice";
import { dashBoardRoutes } from "@routes/index";
import { callTimerNotification } from "@utils/callTimerNotification";

interface ICallPermission {
  callChannelId: string;
}

export default function ChackCallPremission() {
  const { callChannelId } = useRoute()?.params as ICallPermission;
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const handleAccessPermission = async () => {
    const result = await requestCameraAndAudioPermission();
    if (result) {
      callTimerNotification(callChannelId);
      Linking.openURL(`jugol://call/${callChannelId}`);
    } else {
      navigation.push(dashBoardRoutes.bottomTab.path as never);
    }
  };
  return (
    <VStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      space={4}
      p="40px"
    >
      <Image source={LOGO} alt="Logo" h={height / 2} />
      <Text color="gray.500" textAlign="center">
        We need permissions to allow you to join the meeting!
      </Text>
      <Pressable
        onPress={handleAccessPermission}
        bg="primary.100"
        p="2"
        w="full"
        alignItems="center"
        borderRadius="md"
      >
        <Text color="white">Allow</Text>
      </Pressable>
    </VStack>
  );
}
