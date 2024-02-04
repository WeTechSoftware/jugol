import {fontSizes} from '@typography';
import StoryRoundedRenderItem from '@ui/StoryRoundedRenderItem/StoryRoundedRenderItem';
import getSocket from '@utils/socketClient';
import {FlatList, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {IConversationProps} from '../../screens/message-screens/MessagesScreen/MessageScreen.types';

export default function StoryCardRounded({
  conversationList,
}: {
  conversationList: IConversationProps[];
}) {
  const activeList = conversationList?.filter(
    activeUser => activeUser.isActive,
  );

  return (
    <VStack>
      {activeList?.length > 0 ? (
        <VStack>
          <Text fontWeight={700} fontSize={fontSizes.md}>
            Now Online
          </Text>
        </VStack>
      ) : null}
      <FlatList
        nestedScrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={activeList}
        renderItem={({item}) => <StoryRoundedRenderItem {...item} />}
        keyExtractor={item => item?.userID}
      />
    </VStack>
  );
}
