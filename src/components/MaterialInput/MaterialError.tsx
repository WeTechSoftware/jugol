import { HStack, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../../theme-config/colors";
import { fontSizes } from "../../theme-config/typography";
import { IMaterialErrorProps } from "./MaterialError.types";

export default function MaterialError({
  errorMessage,
  textProps,
  iconProps,
  ...rest
}: IMaterialErrorProps) {
  return (
    <HStack alignItems={"flex-start"} space="4px" {...rest}>
      <MaterialIcons
        color={colors.red[100]}
        size={12}
        style={[styles.errorIcon]}
        {...iconProps}
        name={"error-outline"}
      />

      <Text color={"red.500"} fontSize={fontSizes["3xs"]} mt={1} {...textProps}>
        {errorMessage}
      </Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  errorIcon: {
    marginTop: 4,
  },
});
