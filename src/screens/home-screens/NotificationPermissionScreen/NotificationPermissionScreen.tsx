import { Button, Image, Text, VStack } from 'native-base';
import React from 'react';

import Message from '@assets/images/chat.png';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { setCheckNotificationPermission } from '@store/features/auth/authSlice';
import { fontSizes } from '@typography';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import { useDispatch } from 'react-redux';
import { checkNotifeePermission } from '@utils/checkNotificationPermission';

export default function NotificationPermissionScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function requestUserPermission() {
    await checkNotifeePermission();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    dispatch(setCheckNotificationPermission(enabled));
    if (enabled) {
      navigation.goBack();
    }
  }

  return (
    <KeyboardAwareView>
      <VStack flex="1" justifyContent="space-between" bg="white">
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
