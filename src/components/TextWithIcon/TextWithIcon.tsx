import { PressableProps } from "@types/native-base.types";
import { Pressable, Text } from "native-base";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ITextWithIcon extends PressableProps {
  title: string;
  fontSize?: string;
}

const TextWithIcon = ({ title, fontSize = "xl", ...rest }: ITextWithIcon) => {
  return (
    <Pressable
      {...rest}
      flexDirection="row"
      justifyContent={"space-between"}
      my="10px"
      alignItems={"center"}
    >
      <Text fontWeight={700} fontSize={fontSize}>
        {title}
      </Text>
      <AntDesign name="right" color={"#AF0DBD"} size={16} />
    </Pressable>
  );
};

export default TextWithIcon;
