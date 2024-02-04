import notifee, { EventDetail, EventType } from '@notifee/react-native';
import { store } from '@store/index';
import * as Linking from "expo-linking";
import { callApiSlice } from '@store/api/callApi/callApiSlice';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { callTimerNotification } from './callTimerNotification';

async function handleNotification({
  type,
  detail,
}: {
  type: EventType;
  detail: EventDetail;
}) {
  const { notification, pressAction } = detail;

  if (type === EventType.ACTION_PRESS && pressAction?.id === 'view') {
    const { id, currentUser } = notification?.data;
    Linking.openURL(`jugol://chatScreen/${id}/${currentUser}`);
  }

  if (type === EventType.ACTION_PRESS && pressAction?.id === 'accept') {
    try {
      const callDetails = notification?.data;
      const callChannelId = callDetails?.callChannelId;
      await store
        .dispatch(callApiSlice.endpoints.acceptCall.initiate(callDetails))
        .unwrap();
      await notifee.cancelNotification(notification?.id);

      check(PERMISSIONS.ANDROID.CAMERA || PERMISSIONS.ANDROID.RECORD_AUDIO)
        .then((result) => {
          switch (result) {
            case RESULTS.DENIED:
              Linking.openURL(`jugol://callPermission/${callChannelId}`);
              break;
            case RESULTS.GRANTED:
              callTimerNotification(callChannelId);
              Linking.openURL(`jugol://call/${callChannelId}`);
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  } else if (type === EventType.DISMISSED || pressAction?.id === 'reject') {
    try {
      const callDetails = notification?.data;
      await store
        .dispatch(callApiSlice.endpoints.rejectCall.initiate(callDetails))
        .unwrap();
      await notifee.cancelNotification(notification?.id);
    } catch (error) {
      console.log(error);
    }
  }

  if (pressAction?.id === 'View') {
    const callChannelId = notification?.data?.callChannelId;
    Linking.openURL(`jugol://call/${callChannelId}`);
    await notifee.cancelNotification(notification?.id);
  }
}

export default handleNotification;
