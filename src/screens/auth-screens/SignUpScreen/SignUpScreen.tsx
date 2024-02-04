import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {Box, Button, useToast, VStack} from 'native-base';
import React, {useState} from 'react';
import * as Yup from 'yup';

import {authRoutes} from '@routes/index';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import MaterialInput from '@ui/MaterialInput/MaterialInput';

import AuthHeader from '@ui/AuthHeader/AuthHeader';
import PasswordToggler from '@ui/PasswordToggler/PasswordToggler';
import TextWithButton from '@ui/TextWithButton/TextWithButton';

import auth from '@react-native-firebase/auth';
import {useCheckUserMutation} from '@store/api/authApi/authApiSlice';
import {
  login,
  setCheckUserInformation,
  setUID,
} from '@store/features/auth/authSlice';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const [checkUser, results] = useCheckUserMutation();

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one special character and one number',
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required.')
      .oneOf([Yup.ref('password'), null], ' Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async value => {
      setLoading(true);
      Keyboard.dismiss();
      try {
        const {user} = await auth().createUserWithEmailAndPassword(
          value.email,
          value.password,
        );
        // await auth().currentUser?.sendEmailVerification();
        const idToken = await auth().currentUser?.getIdToken();
        dispatch(login(idToken));
        dispatch(setUID(user?.uid));
        if (user?.uid) {
          const results = await checkUser(user?.uid).unwrap();
          const {
            hasUpdatedGender,
            hasUpdatedAddress,
            hasUpdatedProfile,
            hasUpdatedInterest,
            isNewUser,
          } = results.data;
          if (
            !hasUpdatedGender ||
            !hasUpdatedAddress ||
            !hasUpdatedProfile ||
            !hasUpdatedInterest
          ) {
            navigation.navigate(authRoutes.selectGenderScreen.path as never);
            dispatch(setCheckUserInformation(true));
          } else {
            dispatch(setCheckUserInformation(false));
          }
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg="danger.300" px="2" py="2" rounded="sm">
                {error?.message || 'Something went wrong'}
              </Box>
            );
          },
        });
      }
    },
    validationSchema: schema,
  });

  const {values, handleChange, handleBlur, handleSubmit, errors, touched} =
    formik;

  const handleLoginClick = () => {
    navigation.navigate(authRoutes.login.path as never);
  };

  return (
    <KeyboardAwareView>
      <AuthHeader
        title="Sign Up"
        subTitle=" Please enter your valid email address & password to create your
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
        <MaterialInput
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          label="Confirm Password"
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          errorMessage={
            touched.confirmPassword && errors.confirmPassword
              ? errors.confirmPassword
              : ''
          }
          rightElement={
            <PasswordToggler
              shouldShowToggler={values.password.length > 0}
              isPasswordVisible={isConfirmPasswordVisible}
              onTogglePasswordVisibility={() =>
                setIsConfirmPasswordVisible(prev => !prev)
              }
            />
          }
        />
      </VStack>

      <VStack space={4}>
        <TextWithButton
          handleClick={handleLoginClick}
          msgText="Already have an account ?"
          buttonText="Log in"
        />
        <Button onPress={handleSubmit} disabled={loading} variant="primary">
          {loading ? 'Please wait...' : 'Next'}
        </Button>
      </VStack>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
