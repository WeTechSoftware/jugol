import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Container from "../Container/Container";
import { IKeyBoardVStackProps } from "./KeyboardAwareView.types";

export default function KeyboardAwareView({
  children,
  containerStyle,
  hideContainer = false,
  ...rest
}: IKeyBoardVStackProps) {
  return (
    <KeyboardAwareScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
      {...rest}
    >
      {!hideContainer ? (
        <Container {...containerStyle}>{children}</Container>
      ) : (
        children
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
});
