import useNetworkInfo from '@hooks/useNetworkInfo';
import LOGO from '@images/logo.png';
import DashBoardRoutes from '@routes/DashBoardRoutes';
import {MotiView} from 'moti';
import {Image, VStack} from 'native-base';
import React from 'react';
import NoInternet from './NoInternet';

export default function SplashScreen() {
  const {networkIsConnected} = useNetworkInfo();
  setTimeout(() => {
    if (!networkIsConnected) {
      return <NoInternet />;
    }

    return <DashBoardRoutes />;
  }, 2000);
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
