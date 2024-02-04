import { VStack } from "native-base";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface IIconName {
  iconName: string;
  iconColor: string;
}

export default function SwiperElement({ iconName, iconColor }: IIconName) {
  return (
    <VStack
      position={"absolute"}
      top={"20%"}
      left={"40%"}
      bg="white"
      h={"78px"}
      w={"78px"}
      alignItems={"center"}
      justifyContent={"center"}
      rounded={"full"}
    >
      <AntDesign name={iconName} color={iconColor} size={35} />
    </VStack>
  );
}
