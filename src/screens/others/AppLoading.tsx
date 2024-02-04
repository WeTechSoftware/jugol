import LOGO from '@images/logo.png';
import { MotiView } from 'moti';
import { Image, VStack } from 'native-base';
import React from 'react';

export default function AppLoading() {
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
          type: 'timing',
          duration: 1500,
          delay: 100,
        }}>
        <Image source={LOGO} alt="Logo" />
      </MotiView>
    </VStack>
  );
}
