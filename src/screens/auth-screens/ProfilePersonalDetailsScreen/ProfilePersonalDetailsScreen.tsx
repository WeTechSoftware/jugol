import { Box, Button, Pressable, Text, useToast, VStack } from 'native-base';
import React, { useLayoutEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { StyleSheet, Alert } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import * as Yup from 'yup';

import { CalenderIcon, CameraProfile } from '@assets/svg/icons';
import DateSelectorSheet, {
  DAYSHEET_ID,
} from '@action-sheets/DateSelectorSheet/DateSelectorSheet';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import MaterialInput from '@ui/MaterialInput/MaterialInput';
import AuthHeader from '@ui/AuthHeader/AuthHeader';

import { scale } from 'react-native-size-matters';
import ImageBg from '@ui/ImageBg/ImageBg';
import MaterialError from '@ui/MaterialInput/MaterialError';

import defaultProfileImage from '@assets/images/default-profile.png';
import SelectInputImageTypeSheet, {
  IMAGE_INPUT_SHEET_ID,
} from '@action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet';
import useImageUri from '@hooks/useImageUri';
import { authRoutes } from '@routes/index';
import { useNavigation } from '@react-navigation/native';
import SkipButton from '@ui/SkipButton/SkipButton';
import {
  useUpdateUserDataMutation,
  useAddUserProfileMutation,
} from '@store/api/userApi/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IProfilePictureDetails } from './ProfilePersonalDetails.types';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import DatePickerComponent from '@ui/DatePickerComponent/DatePickerComponent';
import colors from '@colors';
import { setCheckUserInformation } from '@store/features/auth/authSlice';

const PROFILE_IMAGE_SIZE = Math.round(scale(90)) + 'px';

export default function ProfilePersonalDetailsScreen() {
  const profileImage = useImageUri(defaultProfileImage);
  const [profileImageDetails, setProfileImageDetails] =
    useState<IProfilePictureDetails>({
      name: '',
      type: '',
      uri: profileImage,
    });
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [updateUserData, results] = useUpdateUserDataMutation();
  const [addProfilePicture, profilePicture] = useAddUserProfileMutation();

  const user = useSelector((autuUser: any) => autuUser.user);

  const schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    birthDate: Yup.date().required('Date of birth is required'),
  });

  const formData = new FormData();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
    },
    onSubmit: async value => {
      try {
        if (profileImageDetails.name) {
          setLoading(true);
          formData.append('profilePic', {
            name: profileImageDetails.name,
            type: profileImageDetails.type,
            uri: profileImageDetails.uri,
          });
          await addProfilePicture(formData);
          await updateUserData(value);
          setLoading(false);
          toast.show({
            placement: 'bottom',
            render: () => {
              return (
                <Box bg="primary.100" px="2" py="2" rounded="sm">
                  <Text color="white">Profile added successfully!</Text>
                </Box>
              );
            },
          });
          navigation.navigate(authRoutes.profileAddressDetails.path as never);
          dispatch(setCheckUserInformation(true));
        } else {
          return Alert.alert('Please select a profile picture!');
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg="danger.200" px="2" py="2" rounded="sm">
                {error.data.message}
              </Box>
            );
          },
        });
      }
    },
    validationSchema: schema,
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = formik;

  return (
    <KeyboardAwareView>
      <AuthHeader title="Profile details" />
      <ImageBg
        containerProps={{
          h: PROFILE_IMAGE_SIZE,
          w: PROFILE_IMAGE_SIZE,
          mx: 'auto',
          bg: 'gray.100',
          rounded: '3xl',
        }}
        resizeMode="cover"
        source={{ uri: profileImageDetails.uri }}>
        <Pressable
          onPress={() => SheetManager.show(IMAGE_INPUT_SHEET_ID)}
          position={'absolute'}
          bottom={-10}
          right={-10}>
          <CameraProfile style={styles.cameraIcon} />
        </Pressable>
      </ImageBg>

      <VStack>
        <MaterialInput
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          errorMessage={
            touched.firstName && errors.firstName ? errors.firstName : ''
          }
          label="First name"
        />
        <MaterialInput
          value={values.lastName}
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          errorMessage={
            touched.lastName && errors.lastName ? errors.lastName : ''
          }
          label="Last name"
        />
        <VStack mt={4} space={'3px'}>
          <Button
            onPress={() => setOpen(true)}
            textAlign={'left'}
            justifyContent={'flex-start'}
            leftIcon={<CalenderIcon style={[styles.calenderIcon]} />}
            variant="preprimary">
            {values.birthDate
              ? dayjs(values.birthDate).format('DD MMMM, YYYY')
              : 'Date of birth'}
          </Button>
          {touched.birthDate && errors.birthDate ? (
            <MaterialError errorMessage={errors.birthDate} />
          ) : null}
        </VStack>
      </VStack>

      <VStack>
        <Button onPress={handleSubmit} variant="primary">
          {loading ? 'Please wait...' : 'Confirm'}
        </Button>
      </VStack>
      <DateSelectorSheet
        setDate={date => {
          setFieldValue('birthDate', new Date(date));
        }}
      />
      <SelectInputImageTypeSheet
        createAccount={true}
        setAsset={res => {
          setProfileImageDetails({
            name: res?.assets?.[0]?.fileName,
            type: res?.assets?.[0]?.type,
            uri: res?.assets?.[0]?.uri,
          });
        }}
      />
      <CustomLoadingModal modalVisible={loading} />
      <DatePickerComponent
        themeColor={colors.primary[100]}
        date={values?.birthDate}
        setDate={date => {
          setFieldValue('birthDate', date);
        }}
        open={open}
        setOpen={setOpen}
      />
    </KeyboardAwareView>
  );
}

const styles = StyleSheet.create({
  calenderIcon: {
    marginLeft: 10,
  },
  cameraIcon: {
    width: 40,
    height: 40,
  },
});
