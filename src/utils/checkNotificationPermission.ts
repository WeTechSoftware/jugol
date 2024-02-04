import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
export const checkNotifeePermission = async () => {
    try {
        const authStatus = await messaging().requestPermission();
        notifee.requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};