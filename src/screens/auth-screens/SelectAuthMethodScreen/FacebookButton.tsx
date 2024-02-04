import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {authRoutes} from '@routes/index';
import {useCheckUserMutation} from '@store/api/authApi/authApiSlice';
import {
  setUID,
  login,
  setCheckUserInformation,
} from '@store/features/auth/authSlice';
import SocialIconButton from '@ui/SocialIconButton/SocialIconButton';
import {Box, useToast} from 'native-base';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';

export default function FacebookButton() {
  const toast = useToast();
  const dispatch = useDispatch();
  const [checkUser, results] = useCheckUserMutation();
  const navigation = useNavigation();

  async function onFacebookButtonPress() {
    try {
      LoginManager.logOut();
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'email',
        'public_profile',
        'user_friends',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      await auth().signInWithCredential(facebookCredential);

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
        !hasUpdatedInterest ||
        isNewUser
      ) {
        navigation.navigate(authRoutes.selectGenderScreen.path as never);
        dispatch(setCheckUserInformation(true));
        return;
      } else {
        navigation.navigate(authRoutes.bottomTab.path as never);
        dispatch(setCheckUserInformation(false));
        return;
      }
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
  }

  return (
    <SocialIconButton icon="facebook-square" onPress={onFacebookButtonPress} />
  );
}
