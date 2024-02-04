import AuthHeader from '@ui/AuthHeader/AuthHeader';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import {VStack, Button} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {authRoutes} from '@routes/index';

export default function ForgetPassword() {
  const navigation = useNavigation();
  return (
    <KeyboardAwareView>
      <AuthHeader
        title="Forget Password"
        subTitle="To reset your password, please select any one of these methods."
      />
      <VStack flex={1} justifyContent="center" space={4}>
        <Button
          variant={'primary'}
          onPress={() =>
            navigation.navigate(
              authRoutes.forgetPasswordWithEmail.path as never,
            )
          }>
          With Email
        </Button>
        <Button
          variant={'outline'}
          onPress={() =>
            navigation.navigate(authRoutes.phoneInputScreen.path as never)
          }>
          With Phone Number
        </Button>
      </VStack>
    </KeyboardAwareView>
  );
}
