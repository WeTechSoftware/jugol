import {Text} from 'native-base';
import React from 'react';
import {IBioTextWithBG} from './BioText.types';

export default function BioTextWithBG({value, isWeight}: IBioTextWithBG) {
  return (
    <Text
      fontSize="sm"
      bg="#F7E7F8"
      my="4px"
      borderRadius={'15px'}
      textAlign="center"
      px="15px"
      color="primary.100"
      py="4px"
      fontWeight={700}>
      {value !== '' && value !== '0' ? (isWeight ? value : value) : ''}
    </Text>
  );
}
