import { Pressable, Text } from "native-base";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import colors from "../../theme-config/colors";
import { IOutLineButton } from "./OutLineButton.types";
import { fontSizes } from "../../theme-config/typography";

export default function OutLineButton({
  placeholder,
  value,
  placeholderTextProps,
  valueTextProps,
  iconStyle,
  ...rest
}: IOutLineButton) {
  //   if value is not null, then return value, else return placeholder
  const textValue = value ? value : placeholder;
  const textColor = placeholder && !value ? "#a3a2a2" : "primary.200";

  const textStyleProps = value ? valueTextProps : placeholderTextProps;

  return (
    <Pressable
      rounded={"2xl"}
      mt={4}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"row"}
      py={"11px"}
      px={"16px"}
      borderColor={"light.100"}
      borderWidth={"1px"}
      {...rest}
    >
      {value ? (
        <Text
          position="absolute"
          top={-6}
          px="5px"
          left={4}
          color="#00000060"
          fontSize="sm"
          bg="white"
        >
          {placeholder}
        </Text>
      ) : null}
      <Text fontSize={fontSizes.sm} color={textColor} {...textStyleProps}>
        {textValue}
      </Text>
      <Entypo
        name="chevron-small-down"
        color={colors.primary[100]}
        size={30}
        {...iconStyle}
      />
    </Pressable>
  );
}
