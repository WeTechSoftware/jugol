/* eslint-disable react-native/no-inline-styles */
import PaymentMethodCard from '@ui/PaymentMethodCard/PaymentMethodCard';
import {Button, Divider, HStack, Text, VStack} from 'native-base';
import React from 'react';
import CREDIT_CARD from '@images/credit-card.png';
import BKASH from '@images/bkash.png';
import ROCKET from '@images/rocket.png';
import NOGOD from '@images/nogod.png';
import {fontSizes} from '@typography';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';
import {useCreatePaymentMutation} from '@store/api/paymentApi/paymentApiSlice';

export default function PaymentMethodScreen({route}: any) {
  const navigation = useNavigation();
  const {price} = route.params;
  const stripe = useStripe();
  const [createPayment, result] = useCreatePaymentMutation();

  const handleCreditCard = async () => {
    try {
      // sending request
      const response = await createPayment({
        amount: price.split(' ')[1],
      }).unwrap();
      // if (!response.ok) return Alert.alert(response.message);
      const clientSecret = response.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Jugol',
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      navigation.navigate(
        'PaymentSuccess' as never,
        {status: 'success'} as never,
      );
      // Alert.alert('Payment complete, thank you!');
    } catch (err) {
      console.error(err);
      navigation.navigate(
        'PaymentSuccess' as never,
        {
          status: 'error',
          subTitle: `${err?.data?.message}!` || 'Not enough money on the card!',
        } as never,
      );
    }
  };
  const handleBkash = () => {
    Alert.alert('Bkash', 'Coming soon!');
  };
  const handleRocket = () => {
    Alert.alert('Rocket', 'Coming soon!');
  };
  const handleNagad = () => {
    Alert.alert('Nagad', 'Coming soon!');
  };
  return (
    <VStack flex={1} bg={'white'} px={'20px'} space={10}>
      <VStack>
        <HStack justifyContent={'space-between'} mt={'30px'}>
          <Text color="dark.200" fontWeight={700}>
            Jugol
          </Text>
          <Text color="dark.200" fontWeight={700}>
            Order N012345
          </Text>
        </HStack>
        <Text fontSize={fontSizes['2xl']} fontWeight={700}>
          {price.split(' ')[1]} {price.split(' ')[2]}
        </Text>
        <Text
          fontSize={fontSizes['2xs']}
          fontWeight={700}
          color="#666666"
          mt={'16px'}
          mb={'22px'}>
          Pay by bank card
        </Text>
        <VStack>
          <PaymentMethodCard
            image={CREDIT_CARD}
            title="Credit/Debit Card"
            titleStyle={{fontSize: 'md', fontWeight: '700'}}
            onPress={handleCreditCard}
          />
          <Divider h={'1.2px'} mt={'30px'} mb={'30px'} />
          <Text
            fontSize={'11px'}
            fontWeight={700}
            color="#666666"
            mt={'16px'}
            mb={'22px'}>
            Other payment methods
          </Text>
          <PaymentMethodCard
            image={BKASH}
            title="Bkash Mobile Banking"
            onPress={handleBkash}
          />
          <PaymentMethodCard
            image={ROCKET}
            title="Rocket of DBBL"
            onPress={handleRocket}
          />
          <PaymentMethodCard
            image={NOGOD}
            title="Nagad"
            onPress={handleNagad}
          />
        </VStack>
      </VStack>
      {/* <Button variant={'primary'}>{price}</Button> */}
    </VStack>
  );
}
