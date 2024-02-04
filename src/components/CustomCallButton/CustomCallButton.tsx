import { Pressable, VStack } from "native-base";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { ICustomCallButton } from "./CustomCallButton.types";

export default function CustomCallButton({
  icon,
  color,
  ...rest
}: ICustomCallButton) {
  const typeOfIcon = typeof icon;

  let SelectIcon =
    typeOfIcon === "object" ? (
      icon
    ) : (
      <Feather name={(icon as string) || "image"} size={24} color={color} />
    );
  return (
    <Pressable
      h={"45px"}
      w={"45px"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"15px"}
      borderWidth={"1px"}
      borderColor={"#E8E6EA"}
      {...rest}
    >
      {SelectIcon}
    </Pressable>
  );
}
