import AppIntroScreen from '@screens/auth-screens/AppIntroScreen/AppIntroScreen';
import EmailVerification from '@screens/auth-screens/EmailVerification/EmailVerification';
import EnableNotificationScreen from '@screens/auth-screens/EnableNotificationScreen/EnableNotificationScreen';
import ForgetPassword from '@screens/auth-screens/ForgetPassword/ForgetPassword';
import LoginScreen from '@screens/auth-screens/LoginScreen/LoginScreen';
import OtpScreen from '@screens/auth-screens/OtpScreen/OtpScreen';
import ProfilePAddressDetailsScreen from '@screens/auth-screens/ProfilePAddressDetailsScreen/ProfilePAddressDetailsScreen';
import ProfilePersonalDetailsScreen from '@screens/auth-screens/ProfilePersonalDetailsScreen/ProfilePersonalDetailsScreen';
import ResetPasswordScreen from '@screens/auth-screens/ResetPasswordScreen/ResetPasswordScreen';
import SearchFriendScreen from '@screens/auth-screens/SearchFriendScreen/SearchFriendScreen';
import SelectAuthMethodScreen from '@screens/auth-screens/SelectAuthMethodScreen/SelectAuthMethodScreen';
import SelectGenderScreen from '@screens/auth-screens/SelectGenderScreen/SelectGenderScreen';
import SignUpScreen from '@screens/auth-screens/SignUpScreen/SignUpScreen';
import UserEmailInputScreen from '@screens/auth-screens/UserEmailInputScreen/UserEmailInputScreen';
import SelectUserInterestScreen from '@screens/auth-screens/UserInterestScreen/SelectUserInterestScreen';
import UserPhoneInputScreen from '@screens/auth-screens/UserPhoneInputScreen/UserPhoneInputScreen';
import {IReactNavigationRoutes} from '../types/route.types';
import BottomTabNavigator from './BottomTabNavigator';

const authScreens: IReactNavigationRoutes = {
  intro: {
    path: 'intro',
    component: AppIntroScreen,
  },
  login: {
    path: 'login',
    component: LoginScreen,
  },
  resetPassword: {
    path: 'resetPassword',
    component: ResetPasswordScreen,
  },
  otp: {
    path: 'otp',
    component: OtpScreen,
  },
  signup: {
    path: 'signup',
    component: SignUpScreen,
  },
  selectAuthMethod: {
    path: 'selectAuthMethod',
    component: SelectAuthMethodScreen,
  },
  profileAddressDetails: {
    path: 'profileAddressDetails',
    component: ProfilePAddressDetailsScreen,
  },
  profilePerSonalDetails: {
    path: 'profilePersonalDetails',
    component: ProfilePersonalDetailsScreen,
  },
  selectGenderScreen: {
    path: 'selectGender',
    component: SelectGenderScreen,
  },
  phoneInputScreen: {
    path: 'phoneInput',
    component: UserPhoneInputScreen,
  },
  selectUserInterestScreen: {
    path: 'userInterest',
    component: SelectUserInterestScreen,
  },
  enableNotificationScreen: {
    path: 'enableNotification',
    component: EnableNotificationScreen,
  },
  searchFriendScreen: {
    path: 'searchFriend',
    component: SearchFriendScreen,
  },
  forgetPassword: {
    path: 'forgetPassword',
    component: ForgetPassword,
  },
  forgetPasswordWithEmail: {
    path: 'forgetPasswordWithEmail',
    component: UserEmailInputScreen,
  },
  bottomTab: {
    path: 'bottomTab',
    component: BottomTabNavigator,
    options: {headerShown: false},
  },
  emailVerification: {
    path: 'emailVerification',
    component: EmailVerification,
    options: {headerShown: false},
  },
};

export default authScreens;
