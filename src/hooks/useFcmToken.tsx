import messaging from '@react-native-firebase/messaging';
import { useCreateFCMTokenMutation } from '@store/api/authApi/authApiSlice';
import { selectCheckUserInformation, selectFCMToken, selectIdToken, setFCMToken } from '@store/features/auth/authSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuthRoutes from './useAuthRoutes';

export default function useFcmToken() {
  const fcmToken = useSelector(selectFCMToken);
  const dispatch = useDispatch();
  const [createFCMToken, fcmResults] = useCreateFCMTokenMutation();
  const idToken = useSelector(selectIdToken);
  const checkUserInformation = useSelector(selectCheckUserInformation);

  const isAuthenticated = useAuthRoutes();

  React.useEffect(() => {
    const createToken = async () => {
      try {
        const isRegistered = messaging().isDeviceRegisteredForRemoteMessages;
        log('isRegistered', isRegistered);
        if (isRegistered) {
          await messaging().registerDeviceForRemoteMessages();
          // Get the token
          const token = await messaging().getToken();
          // Save the token
          await createFCMToken({ fcmToken: token }).unwrap();

          dispatch(setFCMToken(token));
        }
      } catch (error) {
        console.log('Error registering device', error);
      }
    };
    if (!!idToken && !checkUserInformation && !fcmToken) {
      createToken();
    }
  }, [fcmToken, dispatch, createFCMToken]);

  return { fcmToken, fcmResults };
}
