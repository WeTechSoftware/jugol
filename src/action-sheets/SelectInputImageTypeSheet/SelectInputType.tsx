import { Box, Center, Pressable, Text, VStack } from "native-base";
import React from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ISelectInputTypeProps } from "./SelectInputType.types";
export const IMAGE_INPUT_SHEET_ID = "selectImageSheet";

export default function SelectInputType({
  title,
  onSelectPress,
  icon,
}: ISelectInputTypeProps) {
  const typeOfIcon = typeof icon;
  let SelectIcon =
    typeOfIcon === "object" ? (
      icon
    ) : (
      <FontAwesome name={(icon as string) || "image"} size={30} />
    );

  return (
    <Pressable
      borderColor={"#E2E8F0"}
      borderWidth={1}
      w={"48%"}
      rounded="xl"
      overflow="hidden"
      onPress={onSelectPress}
    >
      <Center p={"4"} justifyContent={"center"}>
        {SelectIcon}
        <Text fontWeight={500} mt={2} textAlign={"center"} maxW={"100px"}>
          {title}
        </Text>
      </Center>
    </Pressable>
  );
}
