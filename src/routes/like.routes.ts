import {fontConfig} from '@font-config';
import LikePhotoScreen from '@screens/like-screens/LikePhotoScreen/LikePhotoScreen';
import LikeScreen from '@screens/like-screens/LikeScreen/LikeScreen';
import {HEADER_TITLE_SIZE} from '@utils/constants';
import {IReactNavigationRoutes} from '../types/route.types';

const likeScreens: IReactNavigationRoutes = {
  likeScreen: {
    path: 'likeScreen',
    component: LikeScreen,
    options: {
      headerTitle: 'Liked & Matched',
      headerTitleStyle: {
        fontSize: HEADER_TITLE_SIZE,
        fontFamily: fontConfig.Poppins[700].normal,
      },
      headerLeft: undefined,
    },
  },
  likePhoto: {
    path: 'likePhoto',
    component: LikePhotoScreen,
  },
};

export default likeScreens;
