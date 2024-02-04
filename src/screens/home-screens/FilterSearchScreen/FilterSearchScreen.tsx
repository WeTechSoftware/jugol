import CustomActionsheetList from "@action-sheets/CustomActionsheetList/CustomActionsheetList";
import colors from "@colors";
import { useNavigation } from "@react-navigation/native";
import { dashBoardRoutes } from "@routes/index";
import {
  useGetGenderListQuery,
  useGetProfessionListQuery,
  useGetReligionListQuery,
} from "@store/api/userApi/userApiSlice";
import {
  selectfilterData,
  setFilterData,
} from "@store/features/filterSlice/filterSlice";
import AuthHeader from "@ui/AuthHeader/AuthHeader";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import MaterialInput from "@ui/MaterialInput/MaterialInput";
import OutLineButton from "@ui/OutlineButton/OutLineButton";
import { useFormik } from "formik";
import {
  Button,
  Center,
  HStack,
  Skeleton,
  useToast,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { RefreshControl } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { useDispatch, useSelector } from "react-redux";
import { IFilterInitialValues } from "./FilterSearchScreen.types";

export default function FilterSearchScreen() {
  const [countryModalVisible, setCountryModalVisible] =
    useState<boolean>(false);
  const filterData: IFilterInitialValues = useSelector(selectfilterData);

  const initialValues: IFilterInitialValues = {
    gender: filterData?.gender,
    ageTo: filterData?.ageTo || "",
    ageFrom: filterData?.ageFrom || "",
    cityName: filterData?.cityName || "",
    profession: filterData?.profession || "",
    religion: filterData?.religion || "",
    countryName: filterData?.countryName || "",
    country: null,
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  let professionList: string[] = [];
  let genderList: string[] = [];
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

  const {
    data: genderData,
    isLoading: genderIsLoading,
    isError: genderIsError,
    error: genderError,
    isSuccess: genderIsSuccess,
  } = useGetGenderListQuery(undefined);

  if (!genderIsLoading && genderIsSuccess) {
    genderList.push("All");
    genderData.map((gender: any) => {
      genderList.push(gender.gender);
    });
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (value) => {
      console.log({ value });
    },
  });

  const { values, handleChange, handleBlur, setFieldValue } = formik;

  const handleSelect = (country: any) => {
    setCountryModalVisible(false);
    setFieldValue("countryName", country.name);
    setFieldValue("country", country);
  };

  const handleConfirmClick = () => {
    dispatch(
      setFilterData({
        gender: values.gender,
        countryName: values.countryName,
        cityName: values.cityName,
        profession: values.profession,
        religion: values.religion,
        ageTo: values.ageTo,
        ageFrom: values.ageFrom,
      })
    );
    navigation.goBack();
  };

  const handleResetClick = () => {
    dispatch(
      setFilterData({
        gender: "",
        countryName: "",
        cityName: "",
        profession: "",
        religion: "",
        ageTo: "",
        ageFrom: "",
      })
    );
    navigation.goBack();
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

  if (professionIsLoading || religionIsLoading) {
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
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
          >
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
      <AuthHeader title="Filter or Search" />
      <VStack flex={1}>
        <CustomActionsheetList
          handelEvent={setFieldValue}
          actionList={genderList}
          value={values.gender}
          fieldName="gender"
          placeholder="Gender"
        />
        <HStack justifyContent={"space-between"}>
          <VStack w={"47%"}>
            <MaterialInput
              label={"Min Age"}
              value={values.ageFrom}
              keyboardType={"number-pad"}
              onBlur={handleBlur("ageFrom")}
              onChangeText={handleChange("ageFrom")}
            />
          </VStack>
          <VStack w={"47%"}>
            <MaterialInput
              label={"Max Age"}
              value={values.ageTo}
              keyboardType={"number-pad"}
              onBlur={handleBlur("ageTo")}
              onChangeText={handleChange("ageTo")}
            />
          </VStack>
        </HStack>
        <OutLineButton
          placeholder="Country"
          value={values.countryName}
          onPress={() => setCountryModalVisible(true)}
        />

        {/* <MaterialInput
          label={'City'}
          onBlur={handleBlur('cityName')}
          value={values.cityName}
          onChangeText={handleChange('cityName')}
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
          placeholder="Religion"
          fieldName="religion"
        />
      </VStack>
      <VStack space={4}>
        <Button variant="primary" onPress={handleConfirmClick}>
          Done
        </Button>
        {values.ageFrom ||
          values.ageTo ||
          values.cityName ||
          values.country ||
          values.gender ||
          values.profession ||
          values.religion ? (
          <Button variant="danger" onPress={handleResetClick}>
            Reset
          </Button>
        ) : null}
      </VStack>
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
    </KeyboardAwareView>
  );
}
