import CircleButton from "@ui/CircleButton/CircleButton";
import { HStack } from "native-base";
import React from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function UserBioGroupIcon() {
  return (
    <HStack mt={"12px"} justifyContent={"space-evenly"}>
      <CircleButton
        shadow={4}
        bgColor="#AF0DBD"
        circleSize="46px"
        iconColor="white"
        icon={<Fontisto name="blood-drop" color={"white"} size={20} />}
        iconSize={20}
      />
      <CircleButton
        shadow={4}
        bgColor="#AF0DBD"
        circleSize="46px"
        iconColor="white"
        icon={<FontAwesome5 name="praying-hands" color={"white"} size={20} />}
        iconSize={20}
      />
      <CircleButton
        shadow={4}
        bgColor="#AF0DBD"
        circleSize="46px"
        iconColor="white"
        icon={<FontAwesome name="birthday-cake" size={20} color={"white"} />}
        iconSize={20}
      />
      <CircleButton
        shadow={4}
        bgColor="#AF0DBD"
        circleSize="46px"
        iconColor="white"
        icon={<FontAwesome name="thermometer-3" size={20} color={"white"} />}
        iconSize={20}
      />
    </HStack>
  );
}
