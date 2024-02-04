import { Text, VStack } from "native-base";
import React from "react";

export default function EmailVerification() {
    return (
        <VStack flex={1} justifyContent="center" alignItems="center" bg="white">
            <Text color="primary.100">Please verifiy your email!</Text>
        </VStack>
    );
}
