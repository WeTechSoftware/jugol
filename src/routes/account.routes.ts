import EditUserBasicInfo from '@screens/account-screens/EditUserBasicInfo/EditUserBasicInfo';
import EditUserBio from '@screens/account-screens/EditUserBio/EditUserBio';
import EditUserFamilyDetails from '@screens/account-screens/EditUserFamilyDetails/EditUserFamilyDetails';
import EditUserGallery from '@screens/account-screens/EditUserGallery/EditUserGallery';
import EditUserPartnerDetails from '@screens/account-screens/EditUserPartnerDetails/EditUserPartnerDetails';
import SettingScreen from '@screens/account-screens/SettingScreen/SettingScreen';
import LikePhotoScreen from '@screens/like-screens/LikePhotoScreen/LikePhotoScreen';
import { HEADER_TITLE_SIZE } from '@utils/constants';
import EditUserAbout from '../screens/account-screens/EditUserAbout/EditUserAbout';
import EditUserInterests from '../screens/account-screens/EditUserInterests/EditUserInterests';
import UserEditableProfileScreen from '../screens/account-screens/UserEditableProfileScreen/UserEditableProfileScreen';
import UserProfileScreen from '../screens/account-screens/UserProfileScreen/UserProfileScreen';
import { fontConfig } from '../theme-config/fontConfig';
import { IReactNavigationRoutes } from '../types/route.types';

const profileScreens: IReactNavigationRoutes = {
  userProfile: {
    path: 'userProfile',
    component: UserProfileScreen,
  },
  userEditableProfile: {
    path: 'userEditableProfile',
    component: UserEditableProfileScreen,
  },
  setting: {
    path: 'setting',
    component: SettingScreen,
    options: {
      headerLeft: undefined,
      headerTitle: 'Setting',
      headerTitleStyle: {
        fontFamily: fontConfig.Poppins[700].normal,
        fontSize: HEADER_TITLE_SIZE,
      },
    },
  },
  likePhoto: {
    path: 'likePhoto',
    component: LikePhotoScreen,
  },
  basicInfo: {
    path: 'basicInfo',
    component: EditUserBasicInfo,
  },
  userAbout: {
    path: 'userAbout',
    component: EditUserAbout,
  },
  userInterests: {
    path: 'userInterests',
    component: EditUserInterests,
  },
  userFamily: {
    path: 'userFamily',
    component: EditUserFamilyDetails,
  },
  userGallery: {
    path: 'userGallery',
    component: EditUserGallery,
  },
  userBio: {
    path: 'userBio',
    component: EditUserBio,
  },
  userPartner: {
    path: 'userPartner',
    component: EditUserPartnerDetails,
  },
};

export default profileScreens;
