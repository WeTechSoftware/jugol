import { Button } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../../theme-config/colors";
import { ISocialIconButtonProps } from "./SocialIconButton.types";

export default function SocialIconButton({
  icon = "google",
  size = 28,
  color = colors.dark[100],
  ...rest
}: ISocialIconButtonProps) {
  return (
    <Button
      borderColor={"light.100"}
      p={4}
      rounded={"2xl"}
      variant={"outline"}
      {...rest}
    >
      <AntDesign name={icon} size={Math.round(scale(size))} color={color} />
    </Button>
  );
}
