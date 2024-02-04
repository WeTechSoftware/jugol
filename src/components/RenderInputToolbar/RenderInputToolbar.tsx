import React, { useState } from "react";
// import RenderSend from '@ui/RenderSend/RenderSend';
import { Pressable, HStack, Input, VStack, Text, FlatList } from "native-base";
import {
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from "react-native-gifted-chat";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SheetManager } from "react-native-actions-sheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SelectInputImageTypeSheet from "@action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet";
import {
  Image,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Asset } from "react-native-image-picker";

const RenderInputToolbar = (props: InputToolbarProps<IMessage>) => {
  const [textMessage, setTextMessage] = useState("");
  const [messageImage, setMessageImage] = useState<Asset[]>([]);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    //onBlur?.(e);
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    //onFocus?.(e);
  };

  const handleRemoveImage = (index: number) => {
    if (index > -1) {
      setMessageImage(
        messageImage.filter((img) => img !== messageImage[index])
      );
    }
  };

  return (
    <HStack position="absolute" bottom="10px" space={4} mx="20px">
      {messageImage?.length > 0 ? (
        <VStack position="absolute" bottom="60px" mx="20px">
          <FlatList
            data={messageImage}
            renderItem={({ item, index }) => {
              return (
                <HStack>
                  <Image
                    source={{ uri: item.uri }}
                    style={{ height: 40, width: 40 }}
                  />
                  <VStack position={"absolute"} right={0} bg="#00000025">
                    <AntDesign
                      name="close"
                      color={"white"}
                      onPress={() => handleRemoveImage(index)}
                    />
                  </VStack>
                </HStack>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            ItemSeparatorComponent={() => <VStack w="4px" />}
          />
        </VStack>
      ) : null}
      <Input
        placeholder="Type a message..."
        flex={1}
        value={textMessage}
        multiline
        onChangeText={(text) => setTextMessage(text)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        rightElement={
          textMessage || messageImage?.length > 0 ? (
            <MaterialCommunityIcons
              name="send"
              color={"#AF0DBD"}
              size={26}
              style={{ marginRight: 6 }}
              onPress={() => {
                props?.onSubmit({ text: textMessage, image: messageImage });
                setTextMessage("");
                setMessageImage([]);
              }}
            />
          ) : undefined
        }
      />
      {/* <InputToolbar
        {...props}
        containerStyle={{
          marginLeft: 45,
          borderWidth: 0.8,
          borderColor: '#E8E6EA',
          // bottom: 10,
          borderRadius: 15,
          paddingLeft: 4,
          marginTop: 20,
          width: '63%',
          alignItems: 'center',
          paddingVertical: 0,
        }}
        renderSend={RenderSend}
      /> */}
      <Pressable
        borderWidth={"1px"}
        borderColor={"#E8E6EA"}
        borderRadius={"15px"}
        h={"54px"}
        w={"54px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <FontAwesome
          onPress={() => SheetManager.show("messageImage")}
          name="file-image-o"
          color={"#AF0DBD"}
          size={24}
        />
      </Pressable>
      <SelectInputImageTypeSheet
        sId="messageImage"
        userLibraryOptions={{
          selectionLimit: 0,
          mediaType: "photo",
        }}
        setAsset={(res) => {
          setMessageImage(res?.assets || []);
        }}
      />
    </HStack>
  );
};

export default RenderInputToolbar;
