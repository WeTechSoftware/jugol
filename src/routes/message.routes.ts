import { fontConfig } from '@font-config';
import BlockedUsers from '@screens/message-screens/BlockedUsers/BlockedUsers';
import MessagesScreen from '@screens/message-screens/MessagesScreen/MessagesScreen';
import { HEADER_TITLE_SIZE } from '@utils/constants';
import MessageSettingScreen from '../screens/message-screens/MessageSettingScreen/MessageSettingScreen';
import { IReactNavigationRoutes } from '../types/route.types';

const messageScreens: IReactNavigationRoutes = {
  messagesScreen: {
    path: 'messagesScreen',
    component: MessagesScreen,
    options: {
      headerTitle: 'Messages',
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontSize: HEADER_TITLE_SIZE,
        fontFamily: fontConfig.Poppins[700].normal,
      },
      headerLeft: undefined,
    },
  },
  messageSettingScreen: {
    path: 'messageSettingScreen',
    component: MessageSettingScreen,
  },
  blockedUsers: {
    path: 'blockedUsers',
    component: BlockedUsers,
  },
};

export default messageScreens;
