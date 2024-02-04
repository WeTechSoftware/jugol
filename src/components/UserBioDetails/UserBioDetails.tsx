import { Divider, HStack, Text, VStack } from 'native-base';
import React from 'react';
import UserBioGroupIcon from '@ui/UserBioGroupIcon/UserBioGroupIcon';
import { IUserBioDetails } from './UserBioDetails.types';
import BioText from '@ui/BioText/BioText';
import BioTextWithBG from '@ui/BioText/BioTextWithBG';
import BioHeight from '@ui/BioText/BioHeight';

export default function UserBioDetails({
  heightINC,
  heightCM,
  weight,
  gender,
  maritalStatus,
  skinTone,
  aboutMe = true,
  name,
}: IUserBioDetails) {
  return (
    <VStack>
      <Text fontSize="md" fontWeight={600} mt="30px">
        {aboutMe ? 'Bio' : name + ' Bio'}
      </Text>
      <VStack bg={'#F7E7F8'} borderRadius={'15px'} mt={'12px'}>
        <UserBioGroupIcon />
        <VStack
          bg={'white'}
          mx={'8px'}
          borderRadius={'15px'}
          px={'20px'}
          py={'10px'}
          mb={'8px'}
          mt={'16px'}>
          <HStack justifyContent={'space-between'}>
            <VStack>
              <BioText title="Height" />
              <BioText title="Weight" />
              <BioText title="Skin tone" />
              <BioText title="Gender" />
              <BioText title="Marital status" />
            </VStack>
            <Divider orientation="vertical" />
            <VStack>
              <BioHeight heightINC={heightINC} heightCM={heightCM} />
              <BioTextWithBG value={weight} isWeight={true} />
              <BioTextWithBG value={skinTone} />
              <BioTextWithBG value={gender} />
              <BioTextWithBG value={maritalStatus} />
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
