import { fontConfig } from '@font-config';
import SettingScreen from '@screens/account-screens/SettingScreen/SettingScreen';
import EnableNotificationScreen from '@screens/auth-screens/EnableNotificationScreen/EnableNotificationScreen';
import DiscoverScreen from '@screens/home-screens/DiscoverScreen/DiscoverScreen';
import FilterSearchScreen from '@screens/home-screens/FilterSearchScreen/FilterSearchScreen';
import HomeScreen from '@screens/home-screens/HomeScreen/HomeScreen';
import MatchScreen from '@screens/home-screens/MatchScreen/MatchScreen';
import StoryScreen from '@screens/home-screens/StoryScreen/StoryScreen';
import { HEADER_TITLE_SIZE } from '@utils/constants';
import { IReactNavigationRoutes } from '../types/route.types';

const homeScreens: IReactNavigationRoutes = {
  discover: {
    path: 'discover',
    component: DiscoverScreen,
    options: {
      headerTitle: 'Discover',
      headerTitleStyle: {
        fontSize: HEADER_TITLE_SIZE,
        fontFamily: fontConfig.Poppins[700].normal,
      },
      headerLeft: undefined,
    },
  },
  homeScreen: {
    path: 'homeScreen',
    component: HomeScreen,
  },
  match: {
    path: 'match',
    component: MatchScreen,
  },
  story: {
    path: 'story',
    component: StoryScreen,
  },
  setting: {
    path: 'setting',
    component: SettingScreen,
  },
  enableNotification: {
    path: 'enableNotification',
    component: EnableNotificationScreen,
  },
};

export default homeScreens;
