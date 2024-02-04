import {useNavigation} from '@react-navigation/native';
import {authRoutes, messageRoutes} from '@routes/index';
import AuthHeader from '@ui/AuthHeader/AuthHeader';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import SettingButton from '@ui/SettingButton/SettingButton';
import {Box, Button, useToast, VStack} from 'native-base';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectFCMToken} from '@store/features/auth/authSlice';
import {useDeleteFCMTokenMutation} from '@store/api/authApi/authApiSlice';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MessageSettingScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [deleteFCMToken, results] = useDeleteFCMTokenMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const fcmToken = useSelector(selectFCMToken);

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('login_token');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAwareView>
      <AuthHeader title="Setting" />
      <VStack flex={1} space={8}>
        <SettingButton
          title="Blocked Users"
          subTitle="Integer libero ut facilisis enim at."
          onPress={() =>
            navigation.navigate(messageRoutes.blockedUsers.path as never)
          }
        />
        <SettingButton
          title="Become Premium"
          subTitle="Chicago, IL United States"
          onPress={() => navigation.navigate('BePremium' as never)}
        />
      </VStack>
      <Button
        variant={'primary'}
        onPress={async () => {
          try {
            setLoading(true);
            if (fcmToken) {
              await deleteFCMToken(fcmToken);
            }
            await auth().signOut();
            dispatch(logout());
            removeData();
            setLoading(false);
          } catch (error: any) {
            setLoading(false);
            console.log(error);

            toast.show({
              placement: 'bottom',
              render: () => {
                return (
                  <Box bg="danger.200" px="2" py="2" rounded="sm">
                    {error?.message || 'Something went wrong'}
                  </Box>
                );
              },
            });
          }
        }}>
        Log out
      </Button>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
