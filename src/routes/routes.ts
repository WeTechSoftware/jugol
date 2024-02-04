import {IReactNavigationRoutes} from '../types/route.types';
import accountRoutes from './account.routes';
import authRoutes from './auth.routes';
import bottomTabNavigator from './bottomTab.routes';
import dashBoardRoutes from './dashboard.routes';
import homeRoutes from './home.routes';
import likeRoutes from './like.routes';
import messageRoutes from './message.routes';

const routes: {
  [key: string]: IReactNavigationRoutes;
} = {
  accountRoutes,
  authRoutes,
  bottomTabNavigator,
  dashBoardRoutes,
  homeRoutes,
  likeRoutes,
  messageRoutes,
};

export default routes;
