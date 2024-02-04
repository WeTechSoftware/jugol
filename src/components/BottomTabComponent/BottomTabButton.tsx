import { VStack } from "native-base";
import React from "react";
import { IBottomButton } from "./BottomTabComponent.types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function BottomTabButton({ focused, icon }: IBottomButton) {
  const typeOfIcon = typeof icon;

  let SelectIcon =
    typeOfIcon === "object" ? (
      icon
    ) : (
      <MaterialCommunityIcons
        name={(icon as string) || "image"}
        size={24}
        color={focused ? "#AF0DBD" : "#ADAFBB"}
      />
    );
  return (
    <VStack h="full" justifyContent={"center"} alignItems={"center"}>
      {focused ? (
        <VStack
          position={"absolute"}
          left={-19}
          h={"2px"}
          w={"60px"}
          bg={"primary.100"}
          top={0}
        />
      ) : null}
      {SelectIcon}
    </VStack>
  );
}
