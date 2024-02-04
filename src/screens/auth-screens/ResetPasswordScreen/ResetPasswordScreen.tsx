
import { useFormik } from 'formik';
import { Button, VStack } from 'native-base';
import React from 'react';
import * as Yup from 'yup';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import MaterialInput from '@ui/MaterialInput/MaterialInput';

import AuthHeader from '@ui/AuthHeader/AuthHeader';
import PasswordToggler from '@ui/PasswordToggler/PasswordToggler';

export default function ResetPasswordScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    React.useState(false);
  const schema = Yup.object().shape({
    // email: Yup.string().email('Invalid email').required('Email is required'),
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
      password: '',
      confirmPassword: '',
    },
    onSubmit: value => {
      console.log({ value });
    },
    validationSchema: schema,
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;
  return (
    <KeyboardAwareView>
      <AuthHeader
        title="New Password"
        subTitle=" Please enter your valid email address & password to login to your
            account."
      />

      <VStack>
        <MaterialInput
          type={isPasswordVisible ? 'text' : 'password'}
          label="New Password"
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

      <VStack>
        <Button onPress={handleSubmit} variant="primary">
          Login
        </Button>
      </VStack>
    </KeyboardAwareView>
  );
}
