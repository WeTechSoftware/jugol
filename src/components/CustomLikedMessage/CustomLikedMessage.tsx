/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {Button, HStack, Image, Text, VStack} from 'native-base';
import {ILikedItem} from '../LikedCardList/LikedCardList.types';
import MaterialTextArea from '@ui/MaterialTextArea/MaterialTextArea';
import KeyboardAwareView from '../KeyboardAwareView/KeyboardAwareView';
import {useSendMessageMutation} from '@store/api/messageApi/messageApiSlice';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import {getUserAge} from '@utils/getUserAge';

export default function CustomLikedMessage(props: SheetProps<ILikedItem>) {
  const {payload} = props;
  const [messageText, setMessageText] = useState('');
  const [sendMessage, result] = useSendMessageMutation();
  const [loading, setLoading] = useState(false);

  let userAge = getUserAge(payload?.birthDate);

  const handleSendOneMessage = async () => {
    if (messageText) {
      setLoading(true);
      let message = new FormData();
      message.append('message', messageText);
      message.append('reciver', payload?._id);
      await sendMessage(message);
      setLoading(false);
      setMessageText('');
      SheetManager.hide(payload?._id);
    }
  };

  return (
    <ActionSheet id={props.sheetId}>
      <KeyboardAwareView contentContainerStyle={{borderTopLeftRadius: 20}}>
        <VStack borderTopRadius={'15px'}>
          <Text textAlign={'center'} color="rgba(0, 0, 0, 0.7)">
            As a non-premium user
          </Text>
          <Text textAlign={'center'} fontSize="16px" fontWeight={700} mt="7px">
            You can send 1 message
          </Text>
          <HStack mt={'40px'} alignItems={'center'}>
            <Image
              source={{uri: payload?.profilePic}}
              alt={payload?.firstName}
              h="24px"
              w="24px"
              rounded={'full'}
            />
            <Text color="#4D4D4D" fontWeight={600} ml={'10px'}>
              {payload?.firstName}, {userAge}
            </Text>
          </HStack>
          <MaterialTextArea
            onChangeText={text => setMessageText(text)}
            label="Your message"
            h={'100px'}
            multiline
          />
          <Button
            variant={'primary'}
            mt={'16px'}
            onPress={handleSendOneMessage}>
            Send
          </Button>
        </VStack>
        <CustomLoadingModal modalVisible={loading} />
      </KeyboardAwareView>
    </ActionSheet>
  );
}
