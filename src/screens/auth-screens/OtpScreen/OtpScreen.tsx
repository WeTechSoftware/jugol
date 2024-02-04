import colors from '@colors';
import { fontConfig } from '@font-config';
import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { authRoutes } from '@routes/index';
import { useCheckUserMutation } from '@store/api/authApi/authApiSlice';
import {
  login,
  setCheckUserInformation,
  setUID,
} from '@store/features/auth/authSlice';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { fontSizes } from '@typography';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import { Box, Pressable, Text, VStack, useToast } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

const OTP_INPUT_HEIGHT = 40;
const OTP_INPUT_WIDTH = 40;

export default function OtpScreen() {
  const [time, setTime] = useState<number>(80);
  const timerRef = useRef(time);
  const navigation = useNavigation();
  const route: any = useRoute();
  const [reSend, setReSend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [confirm, setConfirm] = useState(route.params.res);
  const dispatch = useDispatch();
  const toast = useToast();
  const authMethodType = useSelector((user: any) => user.user.authMethodType);
  const [checkUser, results] = useCheckUserMutation();

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        setReSend(true);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <KeyboardAwareView>
      <VStack>
        <Text
          textAlign={'center'}
          fontSize={fontSizes['2xl']}
          fontWeight={'bold'}>
          00:{time}
        </Text>
        <Text
          style={styles.desc}
          textAlign={'center'}
          maxW={'150px'}
          mx={'auto'}
          mt={2}
          fontSize={fontSizes.xs}>
          Type the verification code we’ve sent you
        </Text>
      </VStack>

      <VStack w="full">
        <OTPInputView
          style={styles.otpHeight}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.inputFieldStyle}
          codeInputHighlightStyle={styles.inputHighlightStyle}
          keyboardAppearance="light"
          onCodeFilled={async code => {
            try {
              await confirm.confirm(code);
              const iDToken = await auth().currentUser?.getIdToken();
              const user = auth().currentUser;
              dispatch(login(iDToken));
              dispatch(setUID(user?.uid));
              const results = await checkUser(user?.uid).unwrap();
              const {
                hasUpdatedGender,
                hasUpdatedAddress,
                hasUpdatedProfile,
                hasUpdatedInterest,
                isNewUser,
              } = results.data;
              if (!hasUpdatedGender) {
                navigation.navigate(
                  authRoutes.selectGenderScreen.path as never,
                );
                dispatch(setCheckUserInformation(true));
              } else if (!hasUpdatedProfile) {
                navigation.navigate(
                  authRoutes.profilePerSonalDetails.path as never,
                );
                dispatch(setCheckUserInformation(true));
              } else if (!hasUpdatedAddress) {
                navigation.navigate(
                  authRoutes.profileAddressDetails.path as never,
                );
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
              console.log(error);
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
          }}
          selectionColor={'white'}
        />
      </VStack>

      {reSend ? (
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={styles.send}
            textAlign={'center'}
            maxW={'150px'}
            mx={'auto'}
            mt={2}
            fontSize={fontSizes.md}>
            Send again
          </Text>
        </Pressable>
      ) : null}
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}

const styles = StyleSheet.create({
  inputFieldStyle: {
    fontFamily: fontConfig.Poppins[700].normal,
    borderColor: colors.primary[100],
    borderRadius: 16,
    height: scale(OTP_INPUT_HEIGHT),
    width: scale(OTP_INPUT_WIDTH),
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Math.round(scale(20)),
    backgroundColor: 'white',
    color: colors.primary[100] + '80',
  },
  inputHighlightStyle: {
    backgroundColor: colors.primary[100],
    color: 'white',
  },
  otpHeight: {
    height: scale(OTP_INPUT_HEIGHT + 8),
  },
  desc: {
    color: colors.dark[200],
  },
  send: {
    fontFamily: fontConfig.Poppins[600].normal,
    color: colors.primary[100],
  },
});
