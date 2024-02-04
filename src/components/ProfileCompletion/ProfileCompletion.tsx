import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {IProfileCompletion} from './ProfileCompletion.types';

export default function ProfileComplition({completed}: IProfileCompletion) {
  return (
    <VStack mt="35px" mb="20px">
      <HStack justifyContent={'space-between'} mb="14px">
        <Text fontSize="sm" color="rgba(0, 0, 0, 0.4)">
          Profile Completion
        </Text>
        <Text fontSize="sm" color="primary.100">
          {completed}
        </Text>
      </HStack>
      <VStack h="5px" bg="#D9D9D9">
        <VStack
          width={completed}
          bg="primary.100"
          position={'absolute'}
          left="0px"
          h="5px"
        />
      </VStack>
    </VStack>
  );
}
