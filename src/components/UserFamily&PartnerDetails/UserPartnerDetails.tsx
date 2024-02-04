import React from 'react';
import {Text, VStack} from 'native-base';
import {IUserFamilyDetails} from './UserFamily&PartnerDetails.types';

export default function UserPartnerDetails({value}: IUserFamilyDetails) {
  return (
    <VStack mt={'15px'}>
      <Text fontSize={'16px'} fontWeight={600}>
        Expectations from life partner
      </Text>
      <VStack
        borderWidth={1}
        borderColor="#E8E6EA"
        borderRadius={'15px'}
        mt="12px"
        p={'20px'}>
        <Text>{value}</Text>
      </VStack>
    </VStack>
  );
}
