import {GOOGLE_CLIENT_ID} from '@config';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {authRoutes} from '@routes/index';
import {useCheckUserMutation} from '@store/api/authApi/authApiSlice';
import {
  login,
  setCheckUserInformation,
  setUID,
} from '@store/features/auth/authSlice';
import SocialIconButton from '@ui/SocialIconButton/SocialIconButton';
import {Box, useToast} from 'native-base';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export default function GoogleSignInButton() {
  const toast = useToast();
  const dispatch = useDispatch();
  const [checkUser, results] = useCheckUserMutation();
  const navigation = useNavigation();

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const iDToken = await auth().currentUser?.getIdToken();
      const user = auth().currentUser;
      dispatch(setUID(user?.uid));
      dispatch(login(iDToken));
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
        navigation.navigate(authRoutes.bottomTab.path as never);
        dispatch(setCheckUserInformation(false));
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg="danger.200" px="2" py="2" rounded="sm">
                User cancelled the login flow!
              </Box>
            );
          },
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg="danger.200" px="2" py="2" rounded="sm">
                Play services not available or outdated!
              </Box>
            );
          },
        });
      } else {
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
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
    });
  }, []);
  return <SocialIconButton icon="google" onPress={handleGoogleSignin} />;
}
