import { HStack, Image, Pressable, Text } from "native-base";
import React from "react";
import { IPaymentMethodCard } from "./PaymentMethodCard.types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fontSizes } from "@typography";

export default function PaymentMethodCard({
  image,
  title,
  titleStyle,
  ...rest
}: IPaymentMethodCard) {
  return (
    <Pressable
      flexDirection={"row"}
      justifyContent={"space-between"}
      mb={"16px"}
      alignItems={"center"}
      {...rest}
    >
      <HStack alignItems={"center"}>
        <Image source={image} alt={title} />
        <Text
          ml="10px"
          fontSize={fontSizes["2xs"]}
          color="#1A1A1A"
          fontWeight={500}
          {...titleStyle}
        >
          {title}
        </Text>
      </HStack>
      <AntDesign color={"#4D4D4D"} name="right" />
    </Pressable>
  );
}
