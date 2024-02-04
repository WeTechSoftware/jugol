/* eslint-disable react-native/no-inline-styles */

import CustomActionsheetList from '@action-sheets/CustomActionsheetList/CustomActionsheetList';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Center,
  HStack,
  Skeleton,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React, { useLayoutEffect, useState } from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import * as Yup from 'yup';
import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
import MaterialInput from '@ui/MaterialInput/MaterialInput';
import MaterialTextArea from '@ui/MaterialTextArea/MaterialTextArea';
import OutLineButton from '@ui/OutlineButton/OutLineButton';
import AuthHeader from '@ui/AuthHeader/AuthHeader';
import { IInitialValues } from './ProfilePAddressDetailsScreen.types';
import { useNavigation } from '@react-navigation/native';
import { authRoutes } from '@routes/index';
import SkipButton from '@ui/SkipButton/SkipButton';
import {
  useGetProfessionListQuery,
  useGetReligionListQuery,
  useUpdateUserDataMutation,
} from '@store/api/userApi/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomLoadingModal from '@ui/CustomLoadingModal/CustomLoadingModal';
import { setCheckUserInformation } from '@store/features/auth/authSlice';

export default function ProfilePAddressDetailsScreen() {
  const [countryModalVisible, setCountryModalVisible] =
    useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  let professionList: string[] = [];
  const {
    data: professionData,
    error: professionError,
    isLoading: professionIsLoading,
    error: professionPictureError,
    isError: professionIsError,
    isSuccess: professionIsSuccess,
  } = useGetProfessionListQuery(undefined);
  let religionList: string[] = [];
  const {
    data: religionData,
    error: religionError,
    isLoading: religionIsLoading,
    error: religionPictureError,
    isError: religionIsError,
    isSuccess: religionIsSuccess,
  } = useGetReligionListQuery(undefined);
  const [updateUserData, results] = useUpdateUserDataMutation();

  const user = useSelector((autuUser: any) => autuUser.user);

  const schema = Yup.object().shape({
    countryName: Yup.string().required('Country name is required'),
    // addressLine1: Yup.string().required('Address is required'),
    cityName: Yup.string().required('City name is required'),
    // postCode: Yup.string().required('Postcode is required'),
    profession: Yup.string().required('Profession is required'),
    religion: Yup.string().required('Religion is required'),
    // userAbout: Yup.string().required('About you is required'),
  });

  const initialValues: IInitialValues = {
    // addressLine1: '',
    // addressLine2: '',
    cityName: '',
    // postCode: '',
    profession: '',
    religion: '',
    // userAbout: '',
    countryName: '',
    country: null,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      setLoading(true);
      try {
        await updateUserData(value).unwrap();
        setLoading(false);
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg="primary.100" px="2" py="2" rounded="sm">
                <Text color="white">Address added successfully!</Text>
              </Box>
            );
          },
        });
        navigation.navigate(authRoutes.selectUserInterestScreen.path as never);
        dispatch(setCheckUserInformation(true));
      } catch (error: any) {
        console.log(error.data.message);
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
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
  } = formik;

  const handleSelect = (country: any) => {
    setCountryModalVisible(false);
    setFieldValue('countryName', country.name);
    setFieldValue('country', country);
  };

  if (!professionIsLoading && professionIsSuccess) {
    professionData.map((profession: any) => {
      professionList.push(profession.profession);
    });
  }

  if (!religionIsLoading && religionIsSuccess) {
    religionData.map((religion: any) => {
      religionList.push(religion.religion);
    });
  }

  if (
    professionIsLoading ||
    professionIsError ||
    religionIsLoading ||
    religionIsError
  ) {

    return (
      <VStack>
        <Center w="100%" h="full">
          <VStack
            w="90%"
            maxW="400"
            space={6}
            rounded="md"
            alignItems="center"
            _dark={{
              borderColor: 'coolGray.500',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}>
            <Skeleton h="40" />
            <Skeleton
              borderWidth={1}
              borderColor="coolGray.200"
              endColor="warmGray.50"
              size="40"
              rounded="full"
              mt="-70"
            />
            <HStack space="2">
              <Skeleton size="5" rounded="full" />
              <Skeleton size="5" rounded="full" />
              <Skeleton size="5" rounded="full" />
              <Skeleton size="5" rounded="full" />
              <Skeleton size="5" rounded="full" />
            </HStack>
            <Skeleton.Text lines={3} alignItems="center" px="12" />
            <Skeleton mb="3" w="40" rounded="20" />
            <Skeleton h="20" />
            <Skeleton.Text lines={3} alignItems="center" px="12" />
            <Skeleton mb="3" w="40" rounded="20" />
          </VStack>
        </Center>
      </VStack>
    );
  }

  return (
    <KeyboardAwareView>
      <AuthHeader title="Profile details" />
      <VStack flex={1}>
        {/* <MaterialInput
          label={'Address line 1'}
          value={values.addressLine1}
          onBlur={handleBlur('addressLine1')}
          errorMessage={
            touched.addressLine1 && errors.addressLine1
              ? errors.addressLine1
              : ''
          }
          onChangeText={handleChange('addressLine1')}
        /> */}

        {/* <MaterialInput
          label={'Address line 2 (optional)'}
          value={values.addressLine2}
          onChangeText={handleChange('addressLine2')}
        /> */}
        <OutLineButton
          placeholder="Country"
          value={values.countryName}
          onPress={() => setCountryModalVisible(true)}
        />

        <MaterialInput
          label={'City'}
          onBlur={handleBlur('cityName')}
          errorMessage={
            touched.cityName && errors.cityName ? errors.cityName : ''
          }
          onChangeText={handleChange('cityName')}
        />

        {/* <MaterialInput
          label={'ZIP / postcode'}
          value={values.postCode}
          onBlur={handleBlur('postCode')}
          errorMessage={
            touched.postCode && errors.postCode ? errors.postCode : ''
          }
          onChangeText={handleChange('postCode')}
        /> */}

        <CustomActionsheetList
          handelEvent={setFieldValue}
          actionList={professionList}
          value={values.profession}
          fieldName="profession"
          placeholder="Profession"
        />

        <CustomActionsheetList
          handelEvent={setFieldValue}
          actionList={religionList}
          value={values.religion}
          fieldName="religion"
          placeholder="Religion"
        />

        {/* <MaterialTextArea
          label={'About you'}
          value={values.userAbout}
          onBlur={handleBlur('userAbout')}
          errorMessage={
            touched.userAbout && errors.userAbout ? errors.userAbout : ''
          }
          multiline
          onChangeText={handleChange('userAbout')}
        /> */}
      </VStack>
      <Button variant="primary" onPress={handleSubmit}>
        Confirm
      </Button>
      {countryModalVisible ? (
        <CountryPicker
          withFilter={true}
          withFlag={true}
          visible={countryModalVisible}
          onClose={() => setCountryModalVisible(false)}
          onSelect={handleSelect}
          withAlphaFilter={true}
        />
      ) : null}
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
