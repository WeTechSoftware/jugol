/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Box, Button, HStack, Image, Text, VStack} from 'native-base';
import MATCH_PICTUR1 from '@images/matchPicture1.png';
import PREMIUM_ICON from '@images/premium.png';
import KeyboardAwareView from '../../../components/KeyboardAwareView/KeyboardAwareView';
import {useNavigation} from '@react-navigation/native';
import {fontSizes} from '@typography';

export default function BePremiumScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);
  return (
    <KeyboardAwareView>
      <VStack pt={'40px'} flex={1} alignItems={'center'}>
        <HStack
          bg={'white'}
          shadow={9}
          h={'240px'}
          w={'160px'}
          style={{transform: [{rotate: '10deg'}]}}
          borderRadius={'15px'}>
          <Image
            source={MATCH_PICTUR1}
            alt="match1"
            h={'240px'}
            w={'160px'}
            borderRadius={'15px'}
            resizeMode={'cover'}
          />
          <Box
            position={'absolute'}
            top={'-25px'}
            left={'-20pxpx'}
            h={'60px'}
            w={'60px'}
            borderRadius={'30px'}
            bg="white"
            shadow={9}
            justifyContent={'center'}
            alignItems={'center'}>
            <Image source={PREMIUM_ICON} h={'25px'} w={'30px'} alt={'love'} />
          </Box>
        </HStack>
        <Text
          fontSize={fontSizes['2xl']}
          fontWeight={600}
          py={'30px'}
          color="primary.100">
          Be Premium User
        </Text>
        <HStack alignSelf={'flex-start'} justifyContent={'center'}>
          <Image source={PREMIUM_ICON} h={'25px'} w={'30px'} alt={'love'} />
          <Text fontSize={fontSizes.sm} mb="10px" ml="10px" color="dark.200">
            Send Message to anyone
          </Text>
        </HStack>
        <HStack alignSelf={'flex-start'}>
          <Image source={PREMIUM_ICON} h={'25px'} w={'30px'} alt={'love'} />
          <Text fontSize={fontSizes.sm} mb="10px" ml="10px" color="dark.200">
            See Who Liked You
          </Text>
        </HStack>
        <HStack alignSelf={'flex-start'}>
          <Image source={PREMIUM_ICON} h={'25px'} w={'30px'} alt={'love'} />
          <Text fontSize={fontSizes.sm} ml="10px" color="dark.200">
            Video Call
          </Text>
        </HStack>
        {/* <VStack w={'full'} my={'30px'}>
          <Button variant={'outline'}>Skip</Button>
        </VStack> */}
      </VStack>
      <Button
        variant={'primary'}
        my="20px"
        onPress={() => navigation.navigate('PremiumPackagesScreen' as never)}>
        Subscribe
      </Button>
    </KeyboardAwareView>
  );
}
