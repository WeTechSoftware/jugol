import { Pressable } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IRouteName {
  routeName: string;
}

export default function SettingButtonWithIcon({ routeName }: IRouteName) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(routeName as never)}
      // mr={'20px'}
      borderWidth={"1px"}
      borderColor="#E8E6EA"
      h={"45px"}
      w={"45px"}
      borderRadius={"15px"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Ionicons name="settings" color={"#AF0DBD"} size={24} />
    </Pressable>
  );
}
