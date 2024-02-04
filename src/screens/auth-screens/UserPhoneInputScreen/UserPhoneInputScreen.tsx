import React, { useState } from 'react';

import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { authRoutes } from '@routes/index';
import AuthHeader from '@ui/AuthHeader/AuthHeader';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import PhoneInput from '@ui/PhoneInput/PhoneInput';
import { ICountryWithCode } from '@ui/PhoneInput/PhoneInput.types';
import validatePhone from '@utils/validatePhone';
import { CountryCode } from 'libphonenumber-js';
import { Box, Button, useToast } from 'native-base';

export default function UserPhoneInputScreen() {
  const [error, setError] = useState<boolean>(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [values, setValues] = useState<ICountryWithCode>({
    dialingCode: '+880',
    countryCode: 'BD',
    phoneNumber: '',
  });
  const navigation = useNavigation();

  const handleInfo = (info: ICountryWithCode) => {
    setValues(info);
  };

  const handleSubmit = async () => {
    const hasError = validatePhone(
      values.phoneNumber,
      values.dialingCode,
      values.countryCode as CountryCode,
    );
    setError(hasError);
    if (!hasError) {
      setLoading(true);
      try {
        const res = await auth().signInWithPhoneNumber(
          values.dialingCode + values.phoneNumber,
        );

        navigation.navigate(authRoutes.otp.path as never, { res: res } as never);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg="danger.200" px="2" py="2" rounded="sm">
                {error?.message || 'Something went wrong'}
              </Box>
            );
          },
        });
      }
    }
  };

  return (
    <KeyboardAwareView>
      <AuthHeader
        title="Your mobile"
        subTitle="Please enter your valid phone number. We will send you a 4-digit code to verify your account. "
      />

      <PhoneInput
        errorMessage={error ? 'Phone number is required' : null}
        setPhoneInfo={handleInfo}
      />

      <Button variant={'primary'} disabled={loading} onPress={handleSubmit}>
        {loading ? 'Please wait...' : 'Continue'}
      </Button>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
