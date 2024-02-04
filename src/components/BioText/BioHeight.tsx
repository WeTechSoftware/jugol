import {HStack, Text} from 'native-base';
import React from 'react';
import {IBioHeight} from './BioText.types';

export default function BioHeight({heightINC, heightCM}: IBioHeight) {
  return (
    <HStack
      bg="#F7E7F8"
      borderRadius={'15px'}
      justifyContent="center"
      alignItems={'center'}>
      {heightINC && (
        <Text
          fontSize="2xs"
          py="4px"
          my="4px"
          textAlign="center"
          px="15px"
          color="primary.100"
          fontWeight={700}>
          {heightINC}
        </Text>
      )}
      {heightINC && <Text color="dark.200"> | </Text>}
      {heightINC && (
        <Text
          fontSize="2xs"
          py="4px"
          my="4px"
          textAlign="center"
          px="15px"
          color="primary.100"
          fontWeight={700}>
          {heightCM} cm
        </Text>
      )}
    </HStack>
  );
}
