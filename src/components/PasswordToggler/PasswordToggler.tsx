import { Box } from "native-base";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IPasswordToggler } from "./PasswordToggler.types";

export default function PasswordToggler({
  isPasswordVisible,
  onTogglePasswordVisibility,
  color = "#00000095",
  size = 20,
  shouldShowToggler = true,
  ...rest
}: IPasswordToggler) {
  if (!shouldShowToggler) {
    return <></>;
  }

  return (
    <Box mr="4" {...rest}>
      <Ionicons
        onPress={onTogglePasswordVisibility}
        name={isPasswordVisible ? "eye" : "eye-off"}
        size={size}
        color={color}
      />
    </Box>
  );
}
