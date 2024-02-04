import notifee, { AndroidImportance } from '@notifee/react-native';
import { Alert } from 'react-native';
export const callTimerNotification = (callChannelId: string) => {
    try {
      notifee.createChannel({
        id: callChannelId + '1',
        name: 'Message',
        sound: 'default',
        importance: AndroidImportance.HIGH,
      });
      notifee.displayNotification({
        title: 'Calling...',
        body: 'Tap to view your call',
        subtitle: 'Call',
        data: {callChannelId: callChannelId as string},
        android: {
          channelId: callChannelId + '1',
          timestamp: Date.now(),
          showTimestamp: true,
          showChronometer: true,
          ongoing: true,
          autoCancel: false,
          actions: [
            {
              title: 'View',
              pressAction: {
                id: 'View',
              },
            },
          ],
        },
      });
    } catch (error) {
      Alert.alert("notifee", JSON.stringify(error));
    }
  }