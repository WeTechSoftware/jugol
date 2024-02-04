import React from 'react';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import {Button, HStack, Text, VStack} from 'native-base';

import MATCH_PICTUR1 from '@images/matchPicture1.png';
import MATCH_PICTUR2 from '@images/matchPicture2.png';
import LeftImageComponent from '@ui/MatchScreenComponents/LeftImageComponent';
import RightImageComponent from '@ui/MatchScreenComponents/RightImageComponent';
import {useNavigation} from '@react-navigation/native';

export default function MatchScreen() {
  const navigation = useNavigation();
  return (
    <KeyboardAwareView>
      <HStack h={'350px'} mt={'10px'}>
        <LeftImageComponent picture={MATCH_PICTUR1} />
        <RightImageComponent picture={MATCH_PICTUR2} />
      </HStack>
      <Text
        color="primary.100"
        fontSize="5xl"
        textAlign={'center'}
        mb={'-30px'}>
        It’s a match, Jake!
      </Text>
      <VStack>
        <Text color="dark.100" textAlign={'center'}>
          Start a conversation now with each other
        </Text>
        <Button variant={'primary'} marginY={'20px'}>
          Start Chatting
        </Button>
        <Button variant={'outline'} onPress={() => navigation.goBack()}>
          Keep Swiping
        </Button>
      </VStack>
    </KeyboardAwareView>
  );
}
