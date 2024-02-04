import { CountryCode } from "libphonenumber-js";
import { Divider, Input, Pressable, Text, VStack } from "native-base";
import React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import Entypo from "@expo/vector-icons/Entypo";
import colors from "../../theme-config/colors";
import validatePhone from "../../utils/validatePhone";
import MaterialError from "../MaterialInput/MaterialError";
import { IPhoneInputProps } from "./PhoneInput.types";

export default function PhoneInput({
  onChangeText,
  onBlur,
  onFocus,
  setPhoneInfo,
  errorMessage,
}: IPhoneInputProps) {
  const [show, setShow] = React.useState<boolean>(false);
  const [countryCode, setCountryCode] = React.useState<string>("+880");
  const [countryName, setCountryName] = React.useState<CountryCode>("BD");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState<boolean>();
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const handleCoutryPickerButtonPress = (item: any) => {
    setCountryName(item.code);
    setCountryCode(item.dial_code);
    setPhoneInfo({
      dialingCode: item.dial_code,
      countryCode: item.code,
      phoneNumber: phone,
    });
    setShow(false);
  };

  React.useEffect(() => {
    const hasError = validatePhone(phone, countryCode, countryName);
    setError(hasError);
  }, [phone, countryCode, countryName]);

  const handleError = (text: string) => {
    const hasError = validatePhone(text, countryCode, countryName);
    setError(hasError);
  };

  const handleChangeText = (text: string) => {
    setPhone(text);
    setPhoneInfo({
      dialingCode: countryCode,
      countryCode: countryName,
      phoneNumber: text,
    });
    onChangeText?.(text);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    handleError(phone);
    onBlur?.(e);
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    handleError(phone);
    onFocus?.(e);
  };

  const currentError = isFocused && error ? "Invalid phone number" : undefined;

  const localError = errorMessage ? errorMessage : currentError;

  const messageForError = isFocused ? currentError : localError;

  return (
    <VStack>
      <Input
        leftElement={
          <Pressable
            style={styles.leftInputElementButton}
            onPress={() => setShow(true)}
          >
            <Text ml="35px">({countryCode})</Text>
            <Entypo name="chevron-small-down" color={colors.gray[200]} />
            <Divider orientation="vertical" h="18px" mx="18px" />
          </Pressable>
        }
        placeholder="1234567890"
        style={styles.inputView}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {messageForError ? (
        <MaterialError errorMessage={messageForError} />
      ) : null}
      <CountryPicker
        onBackdropPress={() => setShow(false)}
        lang="en"
        style={{
          modal: {
            height: 500,
          },
        }}
        show={show}
        pickerButtonOnPress={handleCoutryPickerButtonPress}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  leftInputElementButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputView: {
    color: colors.dark[100],
    alignSelf: "center",
    borderColor: colors.light[100],
  },
});
