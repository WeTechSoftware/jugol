import { MotiView } from "moti";
import { Avatar, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ICallingComponent } from "./CallingComponent.types";

export default function CallingComponent({
  handelCallEnd,
  profilePic,
  name,
  callStatus,
}: ICallingComponent) {
  return (
    <VStack flex={1}>
      <VStack alignItems="center" justifyContent="center" space="6" flex={2}>
        <Avatar size="2xl" source={{ uri: profilePic }} />
        <Text fontSize="2xl" fontWeight={500}>
          {name}
        </Text>
        <Text fontSize="lg">{callStatus}</Text>
      </VStack>
      <HStack justifyContent="center" alignItems="center" flex={1}>
        <Pressable
          onPress={handelCallEnd}
          h="52px"
          w="52px"
          rounded={"full"}
          bg="red.500"
          alignItems="center"
          justifyContent="center"
        >
          <MaterialIcons name="call-end" size={24} color="white" />
        </Pressable>
      </HStack>
    </VStack>
  );
}
