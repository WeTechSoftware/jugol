import colors from "@colors";
import OutLineButton from "@ui/OutlineButton/OutLineButton";
import { Actionsheet, Divider, HStack, Text, useDisclose } from "native-base";
import React, { useState } from "react";
import { FlatList } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { ICustomActionSheet } from "./CustomActionsheetList.type";

export default function CustomActionsheetList({
  actionList,
  handelEvent,
  value,
  placeholder,
  fieldName,
}: ICustomActionSheet) {
  const [selectedItem, setSelectedItem] = useState<number>(actionList.length);
  const { isOpen, onOpen, onClose } = useDisclose();

  const ascendingActionList = actionList.sort();

  return (
    <>
      <OutLineButton onPress={onOpen} placeholder={placeholder} value={value} />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <FlatList
            style={{ width: "100%" }}
            data={ascendingActionList}
            ItemSeparatorComponent={() => <Divider opacity={0.3} />}
            renderItem={({ item, index }) => {
              return (
                <Actionsheet.Item
                  key={index}
                  borderBottomWidth={
                    index < actionList.length - 1 ? "1px" : "0px"
                  }
                  borderColor="gray.100"
                  onPress={() => {
                    handelEvent(fieldName, item);
                    onClose();
                    setSelectedItem(index);
                  }}
                >
                  {selectedItem === index || value === item ? (
                    <HStack alignItems={"center"}>
                      <Text w={"94%"}>{item}</Text>
                      <Feather
                        name="check"
                        color={colors.primary[100]}
                        size={20}
                      />
                    </HStack>
                  ) : (
                    <Text>{item}</Text>
                  )}
                </Actionsheet.Item>
              );
            }}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
