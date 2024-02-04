import CustomCallButton from "@ui/CustomCallButton/CustomCallButton";
import { HStack, Text, Image, VStack, Pressable } from "native-base";
import React from "react";
import { SheetManager } from "react-native-actions-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fontSizes } from "../../theme-config/typography";
import { useNavigation } from "@react-navigation/native";

export default function ChatHeader({ user, isActive }) {
  const navigation = useNavigation();

  if (user?.length === 0) {
    return null;
  }

  return (
    <HStack justifyContent={"space-between"} w={"95%"} pb={"10px"} pt={"15px"}>
      <Pressable
        onPress={() => navigation.navigate("LikeProfileScreen", user)}
        flexDirection="row"
        alignItems={"center"}
      >
        <Image
          source={{ uri: user?.profilePic }}
          alt="profile"
          h={"48px"}
          w={"48px"}
          rounded={"full"}
        />
        <VStack ml={"10px"}>
          <Text fontSize={fontSizes.lg} fontWeight={700}>
            {user.firstName} {user.lastName}
          </Text>
          <Text
            fontSize={fontSizes["2xs"]}
            color={isActive ? "primary.100" : "gray.400"}
          >
            {isActive ? "online" : "offline"}
          </Text>
        </VStack>
      </Pressable>
      <CustomCallButton
        icon={<Ionicons name="call-outline" size={24} color="#000" />}
        onPress={() => SheetManager.show("callActionSheet")}
      />
    </HStack>
  );
}
