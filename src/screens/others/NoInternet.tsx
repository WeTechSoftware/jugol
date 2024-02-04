import LOGO from "@images/logo.png";
import { MotiView } from "moti";
import { Button, Image, Text, VStack } from "native-base";
import React from "react";
import * as Linking from "expo-linking";

export default function NoInternet() {
  return (
    <VStack bg="white" flex={1} justifyContent="center" alignItems="center">
      <MotiView
        from={{
          opacity: 1,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          loop: true,
          type: "timing",
          duration: 1500,
          delay: 100,
        }}
      >
        <Image source={LOGO} alt="Logo" />
      </MotiView>
      <Text color="danger.600" fontSize="xl">
        Please connect your internet!
      </Text>
      <Button
        onPress={async () => await Linking.openSettings()}
        mt="20px"
        variant="primary"
      >
        Open Setting
      </Button>
    </VStack>
  );
}
