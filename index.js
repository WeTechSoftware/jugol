import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import 'react-native-gesture-handler';

import Main from './Main';

import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import handleNotification from './src/utils/notificationHandler';
import 'react-native-gesture-handler';
// import { Settings } from 'react-native-fbsdk-next';
// Settings.initializeSDK();

notifee.onBackgroundEvent(handleNotification);

async function onMessageReceived(data) {
  if (data?.data?.notifee) {
    const notifeeData = JSON.parse(data?.data?.notifee);
    const channel = notifeeData?.android?.channelId;
    if (channel) {
      // console.warn('channel', channel);
      await notifee.createChannel({
        id: channel,
        name: 'Message',
        sound: 'default',
        importance: AndroidImportance.HIGH,
      });
      notifee.displayNotification(JSON.parse(data?.data?.notifee));
    }
  }
}
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.warn('setBackgroundMessageHandler', remoteMessage);
  onMessageReceived(remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // eslint-disable-next-line react/react-in-jsx-scope
  return <Main />;
}
registerRootComponent(HeadlessCheck);
