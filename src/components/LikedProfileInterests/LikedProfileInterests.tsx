import React from 'react';
import {HStack, Text, VStack} from 'native-base';
import {ILikedProfileInterests} from './LikedProfileInterests.types';
import OutlinedTextWithIcon from '@ui/OutlinedTextWithIcon/OutlinedTextWithIcon';

export default function LikedProfileInterests(props: ILikedProfileInterests) {
  return (
    <VStack mt={'30px'} w={'full'}>
      <Text fontWeight={700} fontSize={'16px'} mb={'5px'}>
        Interests
      </Text>
      <HStack flexWrap={'wrap'} w={'full'}>
        {props.interestsList.map(interest => (
          <OutlinedTextWithIcon key={interest} interestName={interest} />
        ))}
      </HStack>
    </VStack>
  );
}
