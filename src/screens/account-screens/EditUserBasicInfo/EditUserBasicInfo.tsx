import CustomActionsheetList from "@action-sheets/CustomActionsheetList/CustomActionsheetList";
import SelectInputImageTypeSheet from "@action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet";
import { IMAGE_INPUT_SHEET_ID } from "@action-sheets/SelectInputImageTypeSheet/SelectInputType";
import { CalenderIcon } from "@assets/svg/icons";
import colors from "@colors";
import { DEFAULT_IMAGE } from "@config";
import { useNavigation } from "@react-navigation/native";
import { IProfilePictureDetails } from "@screens/auth-screens/ProfilePersonalDetailsScreen/ProfilePersonalDetails.types";
import {
  useAddUserProfileMutation,
  useGetProfessionListQuery,
  useGetReligionListQuery,
  useGetUserDetailsQuery,
  useUpdateUserDataMutation,
} from "@store/api/userApi/userApiSlice";
import {
  selectLoading,
  selectUserProfile,
} from "@store/features/user/userSlice";
import CircleButton from "@ui/CircleButton/CircleButton";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import DatePickerComponent from "@ui/DatePickerComponent/DatePickerComponent";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import MaterialError from "@ui/MaterialInput/MaterialError";
import MaterialInput from "@ui/MaterialInput/MaterialInput";
import OutLineButton from "@ui/OutlineButton/OutLineButton";
import { useFormik } from "formik";
import moment from "moment";
import {
  Box,
  Button,
  Center,
  HStack,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import CountryPicker from "react-native-country-picker-modal";
import { useSelector } from "react-redux";

export default function EditUserBasicInfo() {
  const windowHeight = Dimensions.get("window").height;
  const [countryModalVisible, setCountryModalVisible] =
    useState<boolean>(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const toast = useToast();

  const userProfile = useSelector(selectUserProfile);
  const userProfileLoading = useSelector(selectLoading);

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
  const [addProfilePicture, profilePicture] = useAddUserProfileMutation();

  const [profileImageDetails, setProfileImageDetails] =
    useState<IProfilePictureDetails>({
      name: "",
      type: "",
      uri: "",
    });

  const formData = new FormData();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      addressLine1: "",
      addressLine2: "",
      cityName: "",
      postCode: "",
      profession: "",
      religion: "",
      countryName: "",
      country: null,
    },
    onSubmit: async (value) => {
      setLoading(true);
      try {
        if (profileImageDetails.name) {
          formData.append("profilePic", {
            name: profileImageDetails.name,
            type: profileImageDetails.type,
            uri: profileImageDetails.uri,
          });
          await addProfilePicture(formData);
        }
        await updateUserData(value);
        navigation.goBack();
        setLoading(false);
        toast.show({
          placement: "bottom",
          render: () => {
            return (
              <Box bg="primary.100" px="2" py="2" rounded="sm">
                <Text color="white">User basic info updated successfully!</Text>
              </Box>
            );
          },
        });
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        toast.show({
          placement: "bottom",
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
    // validationSchema: schema,
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

  const handleSelect = (country: any) => {
    setCountryModalVisible(false);
    setFieldValue("countryName", country.name);
    setFieldValue("country", country);
    // console.log(country);
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

  useEffect(() => {
    if (userProfile) {
      setFieldValue("firstName", userProfile.firstName);
      setFieldValue("lastName", userProfile.lastName);
      setFieldValue("birthDate", userProfile.birthDate);
      setFieldValue("addressLine1", userProfile.addressLine1);
      setFieldValue("addressLine2", userProfile.addressLine2);
      setFieldValue("cityName", userProfile.cityName);
      setFieldValue("postCode", userProfile.postCode);
      setFieldValue("profession", userProfile.profession);
      setFieldValue("religion", userProfile.religion);
      setFieldValue("countryName", userProfile.countryName);
      setProfileImageDetails({
        uri: userProfile.profilePic,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  if (userProfileLoading || religionIsLoading || professionIsLoading) {
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
    <KeyboardAwareView hideContainer>
      <VStack height={(windowHeight / 2).toString() + "px"} w={"full"}>
        <Image
          source={
            profileImageDetails?.uri
              ? { uri: profileImageDetails?.uri }
              : { uri: DEFAULT_IMAGE }
          }
          style={{ height: "100%", width: "100%", resizeMode: "cover" }}
        />
      </VStack>
      <VStack
        bg="white"
        mt={"-25px"}
        borderTopRadius={"30px"}
        px="40px"
        mb={"20px"}
      >
        <HStack mt={"-35px"} alignSelf={"center"}>
          <CircleButton
            bgColor="#AF0DBD"
            circleSize="72px"
            iconColor="white"
            icon="camera"
            iconSize={35}
            onPress={() => SheetManager.show("basic")}
          />
        </HStack>
        <VStack my={"20px"}>
          <Text fontSize="2xl" fontWeight={700}>
            Basic
          </Text>
          <MaterialInput
            value={values.firstName}
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            errorMessage={
              touched.firstName && errors.firstName ? errors.firstName : ""
            }
            label="First Name"
          />
          <MaterialInput
            value={values.lastName}
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            errorMessage={
              touched.lastName && errors.lastName ? errors.lastName : ""
            }
            label="Last Name"
          />
          <VStack mt={4} space={"3px"}>
            <Button
              onPress={() => setOpen(true)}
              textAlign={"left"}
              justifyContent={"flex-start"}
              leftIcon={<CalenderIcon style={[styles.calenderIcon]} />}
              variant="preprimary"
            >
              {values.birthDate
                ? moment(values.birthDate).format("LL")
                : "Date of birth"}
            </Button>
            {touched.birthDate && errors.birthDate ? (
              <MaterialError errorMessage={errors.birthDate} />
            ) : null}
          </VStack>
          <VStack>
            <MaterialInput
              label={"Address line 1"}
              value={values.addressLine1}
              onBlur={handleBlur("addressLine1")}
              errorMessage={
                touched.addressLine1 && errors.addressLine1
                  ? errors.addressLine1
                  : ""
              }
              onChangeText={handleChange("addressLine1")}
            />

            <MaterialInput
              label={"Address line 2 (optional)"}
              value={values.addressLine2}
              onChangeText={handleChange("addressLine2")}
            />

            <OutLineButton
              placeholder="Country"
              value={values.countryName}
              onPress={() => setCountryModalVisible(true)}
            />

            <MaterialInput
              label={"City"}
              onBlur={handleBlur("cityName")}
              value={values.cityName}
              errorMessage={
                touched.cityName && errors.cityName ? errors.cityName : ""
              }
              onChangeText={handleChange("cityName")}
            />

            <MaterialInput
              label={"ZIP / postcode"}
              value={values.postCode}
              onBlur={handleBlur("postCode")}
              errorMessage={
                touched.postCode && errors.postCode ? errors.postCode : ""
              }
              onChangeText={handleChange("postCode")}
            />

            <CustomActionsheetList
              handelEvent={setFieldValue}
              actionList={professionList}
              value={values.profession}
              placeholder="Profession"
              fieldName="profession"
            />

            <CustomActionsheetList
              handelEvent={setFieldValue}
              actionList={religionList}
              value={values.religion}
              placeholder="Religion"
              fieldName="religion"
            />
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
        </VStack>
        <Button disabled={loading} variant={"primary"} onPress={handleSubmit}>
          {loading ? "Please wait..." : "Update"}
        </Button>
      </VStack>
      <SelectInputImageTypeSheet
        sId="basic"
        setAsset={(res) => {
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
        setDate={(date) => {
          setFieldValue("birthDate", date);
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
