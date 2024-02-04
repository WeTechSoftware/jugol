import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import MaterialInput from '@ui/MaterialInput/MaterialInput';
import { Box, Button, Pressable, Text, useToast, VStack } from 'native-base';
import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { authRoutes } from '@routes/index';
import AuthHeader from '@ui/AuthHeader/AuthHeader';
import PasswordToggler from '@ui/PasswordToggler/PasswordToggler';
import TextWithButton from '@ui/TextWithButton/TextWithButton';
import { useFormik } from 'formik';

import auth from '@react-native-firebase/auth';
import { useCheckUserMutation } from '@store/api/authApi/authApiSlice';
import {
  login,
  setCheckUserInformation,
  setUID,
} from '@store/features/auth/authSlice';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [checkUser, results] = useCheckUserMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async value => {
      setLoading(true);
      Keyboard.dismiss();
      try {
        const { user } = await auth().signInWithEmailAndPassword(
          value.email,
          value.password,
        );
        const idToken = await auth().currentUser?.getIdToken();

        dispatch(login(idToken));
        dispatch(setUID(user?.uid));
        const results = await checkUser(user?.uid).unwrap();

        console.log(results);

        const {
          hasUpdatedGender,
          hasUpdatedAddress,
          hasUpdatedProfile,
          hasUpdatedInterest,
          isNewUser,
        } = results?.data;

        console.log(hasUpdatedGender,
          hasUpdatedAddress,
          hasUpdatedProfile,
          hasUpdatedInterest,
          isNewUser);

        if (!hasUpdatedGender) {
          navigation.navigate(authRoutes.selectGenderScreen.path as never);
          dispatch(setCheckUserInformation(true));
        } else if (!hasUpdatedProfile) {
          navigation.navigate(authRoutes.profilePerSonalDetails.path as never);
          dispatch(setCheckUserInformation(true));
        } else if (!hasUpdatedAddress) {
          navigation.navigate(authRoutes.profileAddressDetails.path as never);
          dispatch(setCheckUserInformation(true));
        } else if (!hasUpdatedInterest) {
          navigation.navigate(
            authRoutes.selectUserInterestScreen.path as never,
          );
          dispatch(setCheckUserInformation(true));
        } else {
          // navigation.navigate(authRoutes.bottomTab.path as never);
          dispatch(setCheckUserInformation(false));
        }
        setLoading(false);
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
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;

  const handleSignupClick = () => {
    navigation.navigate(authRoutes.signup.path as never);
  };

  const handleForgetPassword = () => {
    navigation.navigate(authRoutes.forgetPassword.path as never);
  };

  return (
    <KeyboardAwareView>
      <AuthHeader
        title="Login"
        subTitle=" Please enter your valid email address & password to login to your
            account."
      />

      <VStack>
        <MaterialInput
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          errorMessage={touched.email && errors.email ? errors.email : ''}
          keyboardType="email-address"
          label="Email"
        />

        <MaterialInput
          type={isPasswordVisible ? 'text' : 'password'}
          label="Password"
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          errorMessage={
            touched.password && errors.password ? errors.password : ''
          }
          rightElement={
            <PasswordToggler
              shouldShowToggler={values.password.length > 0}
              isPasswordVisible={isPasswordVisible}
              onTogglePasswordVisibility={() =>
                setIsPasswordVisible(prev => !prev)
              }
            />
          }
        />
      </VStack>
      <VStack space={4}>
        <TextWithButton
          handleClick={handleSignupClick}
          msgText="Don't have account ?"
          buttonText="Sign up"
        />
        <Button onPress={handleSubmit} disabled={loading} variant="primary">
          {loading ? 'Please wait...' : 'Login'}
        </Button>
        <Pressable onPress={handleForgetPassword}>
          <Text color={'dark.200'} textAlign={'center'}>
            Forget Password
          </Text>
        </Pressable>
      </VStack>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
