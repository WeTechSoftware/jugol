import colors from "@colors";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "native-base";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

export default function BackButton() {
  const navigation: any = useNavigation();

  if (!navigation || !navigation.canGoBack()) {
    return null;
  }

  return (
    <Pressable
      display={"flex"}
      borderRadius={"15px"}
      borderWidth={"1px"}
      borderColor={"gray.100"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"45px"}
      w={"45px"}
      py={"5px"}
      backgroundColor="#00000025"
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Entypo size={24} name="chevron-small-left" color="#ffffff" />
    </Pressable>
  );
}
