import { Pressable } from "native-base";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ICircleButton } from "./CircleButton.types";

export default function CircleButton({
  bgColor,
  circleSize,
  iconSize = 30,
  iconColor = "#ffff",
  icon = "image",
  ...rest
}: ICircleButton) {
  const typeOfIcon = typeof icon;

  let SelectIcon =
    typeOfIcon === "object" ? (
      icon
    ) : (
      <AntDesign
        name={(icon as string) || "image"}
        size={iconSize}
        color={iconColor}
      />
    );

  return (
    <Pressable
      bg={bgColor}
      h={circleSize}
      w={circleSize}
      {...rest}
      rounded={"full"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {SelectIcon}
    </Pressable>
  );
}
