/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { fontSizes } from '@typography';
import MessageRenderItem from '@ui/MessageRenderItem/MessageRenderItem';
import {FlatList, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import SearchInput from '../SearchInput/SearchInput';
import StoryCardRounded from '../StoryCardRounded/StoryCardRounded';
import {ImageCardList} from './MessageCardList.types';

export default function MessageCardList({data}: ImageCardList) {
  const [searchText, handleSearchText] = useState<string>('');

  return (
    <VStack flex={1}>
      <FlatList
        ListHeaderComponent={() => (
          <VStack space="4">
            <SearchInput
              searchText={searchText}
              handleSearchText={handleSearchText}
            />
            <StoryCardRounded data={data} />
            <Text fontWeight={700} fontSize={fontSizes.md}>
              Messages
            </Text>
          </VStack>
        )}
        contentContainerStyle={{paddingHorizontal: 20}}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical
        data={data}
        renderItem={({item}) => <MessageRenderItem {...item} />}
        keyExtractor={item => item.id}
      />
    </VStack>
  );
}
