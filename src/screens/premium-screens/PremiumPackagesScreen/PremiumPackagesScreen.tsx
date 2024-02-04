import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import {Button, HStack, Image, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import PREMIUM_ICON from '@images/premium.png';
import PremiumPackageCard from '@ui/PremiumPackageCard/PremiumPackageCard';
import {useNavigation} from '@react-navigation/native';
import {messageRoutes} from '@routes/index';
import {fontSizes} from '@typography';

export default function PremiumPackagesScreen() {
  const navigation = useNavigation();
  const [price, setPrice] = useState<string>('Pay 499 BDT');
  const [packageDuration, setPackageDuration] = useState({
    month1: false,
    month3: true,
    year1: false,
  });

  const handlePackageDuration = (type: string) => {
    switch (type) {
      case 'month1':
        setPackageDuration({
          month1: true,
          month3: false,
          year1: false,
        });
        setPrice('Pay 199 BDT');
        break;
      case 'month3':
        setPackageDuration({
          month1: false,
          month3: true,
          year1: false,
        });
        setPrice('Pay 499 BDT');
        break;
      case 'year1':
        setPackageDuration({
          month1: false,
          month3: false,
          year1: true,
        });
        setPrice('Pay 999 BDT');
        break;
    }
  };

  return (
    <KeyboardAwareView>
      <Text color="primary.100" fontWeight={600} fontSize={fontSizes['2xl']}>
        Be Premium User
      </Text>
      <VStack flex={1}>
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
        <HStack justifyContent={'space-between'} mt={'50px'} mb={'22px'}>
          <PremiumPackageCard
            price="199 BDT"
            duration="1 month"
            isSelected={packageDuration.month1}
            onPress={() => handlePackageDuration('month1')}
            w={'48%'}
          />
          <PremiumPackageCard
            price="499 BDT"
            duration="3 month"
            isSelected={packageDuration.month3}
            onPress={() => handlePackageDuration('month3')}
            w={'48%'}
          />
        </HStack>
        <PremiumPackageCard
          price="999 BDT"
          duration="1 year"
          isSelected={packageDuration.year1}
          onPress={() => handlePackageDuration('year1')}
        />
      </VStack>
      <Button
        variant={'primary'}
        onPress={() =>
          navigation.navigate(
            'PaymentMethodScreen' as never,
            {
              price: price,
            } as never,
          )
        }>
        Next
      </Button>
    </KeyboardAwareView>
  );
}
