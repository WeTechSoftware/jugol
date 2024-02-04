/* eslint-disable react-native/no-inline-styles */
import SelectInputImageTypeSheet from "@action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet";
import React, { useState } from "react";
import { IMessage, SendProps } from "react-native-gifted-chat";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function RenderSend({
  onSend,
  text,
  ...rest
}: SendProps<IMessage>) {
  const [messageImage, setMessageImage] = useState<string[]>([]);

  return (
    <>
      {messageImage.length > 0 || text !== "" ? (
        <MaterialCommunityIcons
          name="send"
          color={"#AF0DBD"}
          size={26}
          style={{ marginBottom: 7, marginRight: 6 }}
          onPress={() => {
            onSend?.(
              messageImage?.length > 0
                ? { image: JSON.stringify(messageImage) }
                : { text: text?.trim() },
              true
            );
            setMessageImage([]);
          }}
          {...rest}
        />
      ) : null}
      <SelectInputImageTypeSheet
        sId="messageImage"
        userLibraryOptions={{
          selectionLimit: 0,
          mediaType: "photo",
        }}
        setAsset={(res) => {
          const uris = res?.assets?.map((res) => res?.uri);
          setMessageImage(uris);
        }}
      />
    </>
  );
}
