
import { Button, Image, Text, VStack } from 'native-base';
import React from 'react';

import People from '@assets/images/people.png';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import { fontSizes } from '@typography';
import { useNavigation } from '@react-navigation/native';
import { authRoutes } from '@routes/index';
import { useDispatch } from 'react-redux';

export default function SearchFriendScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAccessContact = async () => {
    navigation.navigate(authRoutes.bottomTab.path as never);
  }

  return (
    <KeyboardAwareView>
      <VStack flex="1" justifyContent="space-between">
        <Image mx={'auto'} source={People} alt="Logo" />

        <VStack>
          <Text
            textAlign={'center'}
            fontSize={fontSizes.lg}
            fontWeight={'bold'}>
            Search friend’s
          </Text>
          <Text textAlign={'center'} mt={2} fontSize={fontSizes.xs}>
            You can find friends from your contact lists to connected
          </Text>
        </VStack>

        <VStack>
          <Button onPress={handleAccessContact} variant={'primary'}>Access to a contact list</Button>
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}
