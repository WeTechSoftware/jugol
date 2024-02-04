/* eslint-disable react-native/no-inline-styles */
import React from "react";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { HStack, Image, Pressable, Text, VStack } from "native-base";
import CustomCallButton from "../../components/CustomCallButton/CustomCallButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SheetManager } from "react-native-actions-sheet";
import PREMIUM_ICON from "@images/premium.png";

export default function CallActionSheet(props) {
  const { payload } = props;
  return (
    <ActionSheet id={props.sheetId}>
      <HStack p={"60px"} justifyContent={"space-evenly"}>
        <VStack alignItems={"center"}>
          <CustomCallButton
            onPress={props.handleAudioCall}
            icon={<Ionicons name="call-outline" size={24} color="#AF0DBD" />}
          />
          <Text color={"rgba(0, 0, 0, 0.7)"} mt={"12px"}>
            Audio Call
          </Text>
        </VStack>
        <VStack alignItems={"center"}>
          <CustomCallButton
            icon={"video"}
            color="#C7C7C7"
            disabled={!payload}
          />
          <Text color={payload ? "rgba(0, 0, 0, 0.7)" : "#C7C7C7"} mt={"12px"}>
            Video Call
          </Text>
          {payload ? null : (
            <Image
              position={"absolute"}
              top="-18px"
              source={PREMIUM_ICON}
              h={"24px"}
              w={"28px"}
              alt="premium"
            />
          )}
        </VStack>
      </HStack>
      <Ionicons
        name="close"
        color={"#EB5757"}
        size={35}
        style={{ alignSelf: "center" }}
        onPress={() => SheetManager.hide("callActionSheet")}
      />
    </ActionSheet>
  );
}
