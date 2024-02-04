import { HStack, Pressable, Text } from "native-base";
import React from "react";
import { IPremiumPackageCard } from "./PremiumPackageCard.types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fontSizes } from "@typography";

export default function PremiumPackageCard({
  price,
  duration,
  isSelected,
  ...rest
}: IPremiumPackageCard) {
  return (
    <Pressable
      {...rest}
      borderWidth={"1px"}
      borderColor={isSelected ? "#AF0DBD" : "#E8E6EA"}
      borderRadius={"15px"}
      h={"90px"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text fontSize={fontSizes.lg} fontWeight={500}>
        {price}
      </Text>
      <HStack position={"absolute"} top={-10}>
        <Text
          color={"rgba(0, 0, 0, 0.4)"}
          bg={"white"}
          px={"2px"}
          fontSize={fontSizes["2xs"]}
        >
          {duration}
        </Text>
      </HStack>
      {isSelected ? (
        <HStack
          position={"absolute"}
          right={-6}
          top={-6}
          bg={"white"}
          rounded={"full"}
        >
          <AntDesign name="checkcircle" color={"#AF0DBD"} size={18} />
        </HStack>
      ) : null}
    </Pressable>
  );
}
