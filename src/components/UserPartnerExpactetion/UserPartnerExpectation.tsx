import React from 'react';
import {Text, VStack} from 'native-base';
import TitleWithEditIcon from '@ui/ProfileTitle/ProfileTitle';
import {IUserPartnerExpectation} from './UserPartnerExpectation.types';

export default function UserPartnerExpectation({
  handlePartnerExpectation,
  partnerExpectation,
}: IUserPartnerExpectation) {
  return (
    <VStack mt={'30px'}>
      <TitleWithEditIcon
        title="Expectations from life partner"
        fontSize="16px"
        fontWeight={700}
        handleSection={handlePartnerExpectation}
      />
      <Text
        fontSize={'14px'}
        fontWeight={400}
        color="dark.200"
        numberOfLines={4}
        mt={'5px'}>
        {partnerExpectation}
      </Text>
    </VStack>
  );
}
