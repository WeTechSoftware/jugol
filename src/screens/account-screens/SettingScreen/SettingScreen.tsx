import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {accountRoutes, homeRoutes} from '@routes/index';
import {useDeleteFCMTokenMutation} from '@store/api/authApi/authApiSlice';
import {logout} from '@store/features/auth/authSlice';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import SettingButton from '@ui/SettingButton/SettingButton';
import {Box, Button, useToast} from 'native-base';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectFCMToken} from '../../../../redux/features/auth/authSlice';

const settings = [
  {
    title: 'Edit Profile',
    subTitle: 'Integer libero ut facilisis enim at.',
    type: 'reset',
  },
  {
    title: 'Become Premium',
    subTitle: 'Chicago, IL United States',
    type: 'premium',
  },
  {
    title: 'Safety & Tips',
    subTitle: 'Chicago, IL United States',
    type: 'safety',
  },
  {
    title: 'FAQ',
    subTitle: 'Chicago, IL United States',
    type: 'faq',
  },
  {
    title: 'About Us',
    subTitle: 'Chicago, IL United States',
    type: 'about',
  },
  {
    title: 'Privacy Policy',
    subTitle: 'Chicago, IL United States',
    type: 'policy',
  },
];

export default function SettingScreen() {
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

  const handleSettings = (type: string) => {
    switch (type) {
      case 'reset':
        navigation.navigate(accountRoutes.userEditableProfile.path as never);
        break;
      case 'premium':
        navigation.navigate('BePremium' as never);
        break;
      case 'safety':
        Alert.alert('Upcoming', 'This feature will be updated soon!');
        break;
      case 'faq':
        Alert.alert('Upcoming', 'This feature will be updated soon!');
        break;
      case 'about':
        Alert.alert('Upcoming', 'This feature will be updated soon!');
        break;
      case 'policy':
        Alert.alert('Upcoming', 'This feature will be updated soon!');
        break;
    }
  };
  return (
    <KeyboardAwareView>
      {settings.map(setting => {
        return (
          <SettingButton
            key={setting.title}
            title={setting.title}
            subTitle={setting.subTitle}
            onPress={() => handleSettings(setting.type)}
          />
        );
      })}
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
