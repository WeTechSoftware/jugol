import React, { useState } from 'react';

import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { authRoutes } from '@routes/index';
import AuthHeader from '@ui/AuthHeader/AuthHeader';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import MaterialInput from '@ui/MaterialInput/MaterialInput';
import { useFormik } from 'formik';
import { Box, Button, useToast } from 'native-base';
import { Keyboard } from 'react-native';
import * as Yup from 'yup';

export default function UserEmailInputScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async value => {
      Keyboard.dismiss();
      setLoading(true);
      try {
        await auth().sendPasswordResetEmail(value.email);
        setLoading(false);
        navigation.navigate(authRoutes.login.path as never);
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg="primary.100" color="white" px="2" py="2" rounded="sm">
                Pelase check your email to reset your password!
              </Box>
            );
          },
        });
      } catch (error: any) {
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
    },
    validationSchema: schema,
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;

  return (
    <KeyboardAwareView>
      <AuthHeader
        title="Your email"
        subTitle="Please enter your valid email. We will send you a 4-digit code to verify your account."
      />
      <MaterialInput
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        errorMessage={touched.email && errors.email ? errors.email : ''}
        keyboardType="email-address"
        label="Email"
      />
      <Button variant={'primary'} disabled={loading} onPress={handleSubmit}>
        {loading ? 'Please wait...' : 'Continue'}
      </Button>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
