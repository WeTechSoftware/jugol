import React from "react";
import { IBottomTabComponent } from "./BottomTabComponent.types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomTabButton from "./BottomTabButton";

export default function BottomTabComponent({
  focused,
  routeName,
}: IBottomTabComponent) {
  switch (routeName) {
    case "home":
      return <BottomTabButton focused={focused} icon="cards" />;
    case "like":
      return (
        <BottomTabButton
          icon={
            <AntDesign
              name="heart"
              size={24}
              color={focused ? "#AF0DBD" : "#ADAFBB"}
            />
          }
          focused={focused}
        />
      );
    case "message":
      return <BottomTabButton focused={focused} icon="message-text" />;
    case "profile":
      return (
        <BottomTabButton
          icon={
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#AF0DBD" : "#ADAFBB"}
            />
          }
          focused={focused}
        />
      );
    default:
      return null;
  }
}
