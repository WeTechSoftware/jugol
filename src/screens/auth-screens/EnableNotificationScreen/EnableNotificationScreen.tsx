
import { Button, Image, Text, VStack } from 'native-base';
import React from 'react';

import Message from '@assets/images/chat.png';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import { fontSizes } from '@typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import { authRoutes } from '@routes/index';
import { useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { setCheckNotificationPermission } from '@store/features/auth/authSlice';

export default function EnableNotificationScreen() {
  const route = useRoute();
  const { home } = route?.params as { home: string };
  const navigation = useNavigation();
  const dispatch = useDispatch();


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    dispatch(setCheckNotificationPermission(enabled));
    if (enabled && home !== 'home') {
      navigation.navigate(authRoutes.searchFriendScreen.path as never);
    } else if (enabled && home === 'home') {
      navigation.navigate(authRoutes.bottomTab.path as never);
    }
  }

  return (
    <KeyboardAwareView>
      <VStack flex="1" justifyContent="space-between">
        <Image mx={'auto'} source={Message} alt="Logo" />

        <VStack>
          <Text
            textAlign={'center'}
            fontSize={fontSizes.lg}
            fontWeight={'bold'}>
            Enable notification’s
          </Text>
          <Text textAlign={'center'} mt={2} fontSize={fontSizes.xs}>
            Get push-notification when you get the match or receive a message.
          </Text>
        </VStack>

        <VStack>
          <Button onPress={requestUserPermission} variant={'primary'}>
            I want to be notified
          </Button>
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}
