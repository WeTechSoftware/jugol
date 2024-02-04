import { ErrorPayment, SuccessPayment } from "@assets/svg/icons";
import { useNavigation } from "@react-navigation/native";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import { Pressable, Text, VStack } from "native-base";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PaymentSuccess({ route }: any) {
  const { status, subTitle } = route.params;
  const navigation = useNavigation();

  return (
    <KeyboardAwareView>
      <VStack flex={1} alignItems="center" justifyContent="center">
        {status === "success" ? (
          <>
            <SuccessPayment style={{ height: 80, width: 80 }} />
            <Text
              mt="16px"
              fontWeight={600}
              fontSize="2xl"
              textAlign="center"
              color="#1A1A1A"
            >
              Payment successfully completed.
            </Text>
            <Pressable
              flexDirection="row"
              alignItems="center"
              mt="30px"
              onPress={() => navigation.navigate("home" as never)}
            >
              <AntDesign name="arrowleft" color="#007AFF" size={22} />
              <Text ml="10px" color="#007AFF" fontSize="md" fontWeight={500}>
                Go back to the Jugal
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <ErrorPayment style={{ height: 80, width: 80 }} />
            <Text
              mt="16px"
              fontWeight={600}
              fontSize="2xl"
              textAlign="center"
              color="#1A1A1A"
            >
              Payment failed!
            </Text>
            <Text color="#4D4D4D" fontSize="sm" fontWeight={400}>
              {subTitle}
            </Text>
            <Pressable
              flexDirection="row"
              alignItems="center"
              mt="30px"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" color="#007AFF" size={22} />
              <Text ml="10px" color="#007AFF" fontSize="md" fontWeight={500}>
                Pay with another card.
              </Text>
            </Pressable>
          </>
        )}
      </VStack>
    </KeyboardAwareView>
  );
}
