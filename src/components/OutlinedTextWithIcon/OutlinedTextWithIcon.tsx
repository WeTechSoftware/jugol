import { HStack, Text } from "native-base";
import React from "react";
import { IOutLineTextWithIcon } from "./OutlinedTextWithIcon.types";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OutlinedTextWithIcon({
  interestName,
}: IOutLineTextWithIcon) {
  return (
    <HStack
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      px={"10px"}
      py={"5px"}
      borderWidth={"1px"}
      borderColor={"primary.100"}
      borderRadius={"5px"}
      mr={"14px"}
      mb={"10px"}
    >
      <Ionicons name="checkmark-done" color={"#AF0DBD"} size={18} />
      <Text fontWeight={500} ml={"6px"} color={"primary.100"}>
        {interestName}
      </Text>
    </HStack>
  );
}
