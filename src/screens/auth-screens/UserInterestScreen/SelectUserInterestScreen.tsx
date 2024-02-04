/* eslint-disable react-native/no-inline-styles */
import {Box, Button, HStack, Text, useToast} from 'native-base';
import React, {useLayoutEffect, useState} from 'react';

import {
  ArtIcon,
  CameraIcon,
  CookingIcon,
  DrinkIcon,
  ExtremeIcon,
  MusicIcon,
  PlayingIcon,
  ShoppingIcon,
  SwimmingIcon,
  TravellingIcon,
  VideogameIcon,
  YogaIcon,
} from '@assets/svg/icons';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import {fontSizes} from '@typography';
import colors from '@colors';
import AuthHeader from '@ui/AuthHeader/AuthHeader';
import {authRoutes} from '@routes/index';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateUserDataMutation} from '@store/api/userApi/userApiSlice';
import {setCheckUserInformation} from '@store/features/auth/authSlice';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';

const interestData = [
  {
    id: '1',
    name: 'Photography',
    icon: CameraIcon,
  },
  {
    id: '2',
    name: 'Shopping',
    icon: ShoppingIcon,
  },
  {
    id: '3',
    name: 'Yoga',
    icon: YogaIcon,
  },
  {
    id: '4',
    name: 'Cooking',
    icon: CookingIcon,
  },
  {
    id: '5',
    name: 'Tennis',
    icon: PlayingIcon,
  },
  {
    id: '6',
    name: 'Karaoke',
    icon: MusicIcon,
  },
  {
    id: '7',
    name: 'Swimming',
    icon: SwimmingIcon,
  },
  {
    id: '8',
    name: 'Traveling',
    icon: TravellingIcon,
  },
  {
    id: '9',
    name: 'Art',
    icon: ArtIcon,
  },
  {
    id: '10',
    name: 'Extreme',
    icon: ExtremeIcon,
  },
  {
    id: '11',
    name: 'Music',
    icon: MusicIcon,
  },
  {
    id: '12',
    name: 'Drink',
    icon: DrinkIcon,
  },
  {
    id: '13',
    name: 'Video games',
    icon: VideogameIcon,
  },
];

export default function SelectUserInterestScreen() {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [updateUserData, results] = useUpdateUserDataMutation();

  const handleSelection = (name: string) => {
    const isAlreadySelected = selectedButtons.includes(name);
    if (isAlreadySelected) {
      const filtredItems = selectedButtons.filter(item => item !== name);
      setSelectedButtons(filtredItems);
    } else {
      setSelectedButtons(prev => [...prev, name]);
    }
  };

  const handleContinueClick = async () => {
    if (selectedButtons.length > 0) {
      setLoading(true);
      try {
        await updateUserData({interests: selectedButtons}).unwrap();
        setLoading(false);
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg="primary.100" px="2" py="2" rounded="sm">
                <Text color="white">Interests added successfully!</Text>
              </Box>
            );
          },
        });
        navigation.navigate(authRoutes.bottomTab.path as never);
        dispatch(setCheckUserInformation(false));
      } catch (error: any) {
        console.log(error?.data?.message);
        setLoading(false);
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg="danger.200" px="2" py="2" rounded="sm">
                {error?.data?.message || 'Something went wrong'}
              </Box>
            );
          },
        });
      }
    } else {
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <Box bg="danger.200" px="2" py="2" rounded="sm">
              Please select any interest!
            </Box>
          );
        },
      });
    }
  };

  return (
    <KeyboardAwareView
      containerStyle={{
        justifyContent: 'space-between',
      }}>
      <AuthHeader
        title="Your interests"
        subTitle="Select a few of your interests and let everyone know what you’re passionate about."
      />

      <HStack flexWrap="wrap" justifyContent="space-between">
        {interestData.map(btnInfo => {
          const Icon = btnInfo.icon;
          const isSelected = selectedButtons.includes(btnInfo.name);
          return (
            <Button
              borderWidth={'1.5px'}
              borderColor={isSelected ? colors.primary[100] : colors.light[100]}
              onPress={() => handleSelection(btnInfo.name)}
              justifyContent={'flex-start'}
              w="47%"
              mb="10px"
              variant={isSelected ? 'primary' : 'outline'}
              key={btnInfo.name}>
              <HStack alignItems={'center'} bg={'transparent'}>
                <Icon
                  style={{
                    tintColor: isSelected ? '#fff' : '#000',
                  }}
                />
                <Text
                  fontSize={fontSizes['2xs']}
                  color={isSelected ? '#fff' : '#000'}
                  ml="8.79px">
                  {btnInfo.name}
                </Text>
              </HStack>
            </Button>
          );
        })}
      </HStack>

      <Button onPress={handleContinueClick} variant={'primary'} mt="10px">
        Continue
      </Button>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
