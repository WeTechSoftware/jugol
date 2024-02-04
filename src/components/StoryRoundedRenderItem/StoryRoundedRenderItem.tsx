import {Avatar, Box, Text, VStack, Pressable} from 'native-base';
import React, {useState} from 'react';
import {fontSizes} from '../../theme-config/typography';
import {IConversationProps} from '../../screens/message-screens/MessagesScreen/MessageScreen.types';
import {useNavigation} from '@react-navigation/native';
import {messageRoutes} from '@routes/index';
import {Alert} from 'react-native';
import {useDeleteBlockMutation} from '@store/api/blockApi/blockApiSlice';

export default function StoryRoundedRenderItem(props: IConversationProps) {
  const navigation = useNavigation();
  const [deleteBlock, deleteResult] = useDeleteBlockMutation();
  const [loading, setLoading] = useState(false);
  if (!props) {
    return null;
  }

  const imageSrc = props?.profilePic
    ? {
        uri: props?.profilePic,
      }
    : undefined;

  return (
    <Pressable
      pr={2}
      py="2"
      onPress={() => {
        !props?.blockedByYou && props?.blockedBySomeone
          ? Alert.alert(
              `Blocked By ${props?.name}`,
              `You can't send any message!`,
              [{text: 'OK'}],
            )
          : props?.isBlocked
          ? Alert.alert(`Unblock`, `Do you want to unblock ${props.name} ?`, [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  setLoading(true);
                  await deleteBlock({user2: props?.userID});
                  setLoading(false);
                },
              },
            ])
          : navigation.navigate(
              'ChatScreen' as never,
              {
                id: props?.userID,
                currentUser: props?.currentUser,
                isActive: props?.isActive,
              } as never,
            );
      }}>
      <VStack space={2} justifyContent="space-between" alignItems={'center'}>
        <Avatar source={imageSrc} size={'lg'} bg={'blue.700'}>
          <Text
            fontSize={fontSizes.md}
            numberOfLines={1}
            adjustsFontSizeToFit
            maxFontSizeMultiplier={1}
            color="white"
            fontWeight={700}>
            {props?.name?.slice(0, 2)?.toUpperCase()}
          </Text>
          <Avatar.Badge bg="green.500" />
        </Avatar>

        <Text
          w={'70px'}
          overflow={'hidden'}
          numberOfLines={1}
          fontWeight={600}
          fontSize={fontSizes.sm}
          textAlign={'center'}>
          {props?.name?.slice(0, 6)}
        </Text>
      </VStack>
    </Pressable>
  );
}
