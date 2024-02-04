/* eslint-disable react-native/no-inline-styles */
import LikedCard from '@ui/LikedCard/LikedCard';
import {FlatList} from 'native-base';
import React from 'react';
import {ILikedCardList} from './LikedCardList.types';

export default function LikedCardList({data, type, isPremium}: ILikedCardList) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 20}}
      renderItem={({item}) => {
        return <LikedCard item={item} type={type} isPremium={isPremium} />;
      }}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
    />
  );
}
