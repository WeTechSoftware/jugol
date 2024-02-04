import {IReactNavigationRoutes} from '../types/route.types';
import AccountRoutes from './AccountRoutes';
import HomeRoutes from './HomeRoutes';
import LikeRoutes from './LikeRoutes';
import MessageRoutes from './MessageRoutes';

const bottomTabNavigator: IReactNavigationRoutes = {
  home: {
    path: 'home',
    component: HomeRoutes,
  },
  like: {
    path: 'like',
    component: LikeRoutes,
  },
  message: {
    path: 'message',
    component: MessageRoutes,
  },
  profile: {
    path: 'profile',
    component: AccountRoutes,
  },
};

export default bottomTabNavigator;
