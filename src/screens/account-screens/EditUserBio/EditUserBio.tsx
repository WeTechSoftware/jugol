import CustomActionsheetList from "@action-sheets/CustomActionsheetList/CustomActionsheetList";
import CircleButton from "@ui/CircleButton/CircleButton";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import MaterialInput from "@ui/MaterialInput/MaterialInput";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Center,
  HStack,
  Pressable,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useState, useEffect } from "react";
import {
  useAddUserProfileMutation,
  useGetGenderListQuery,
  useGetUserDetailsQuery,
  useUpdateUserDataMutation,
} from "@store/api/userApi/userApiSlice";
import { useNavigation } from "@react-navigation/native";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import { Dimensions, Image } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { IMAGE_INPUT_SHEET_ID } from "@action-sheets/SelectInputImageTypeSheet/SelectInputType";
import SelectInputImageTypeSheet from "@action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet";
import { IProfilePictureDetails } from "@screens/auth-screens/ProfilePersonalDetailsScreen/ProfilePersonalDetails.types";
import ScrollableHeightWeight from "@ui/ScrollableHeightWeight/ScrollableHeightWeight";
import OutLineButton from "@ui/OutlineButton/OutLineButton";
import useHeightList from "@hooks/useHeightList";
import useWeightList from "@hooks/useWeightList";
import { DEFAULT_IMAGE } from "@config";

const skinToneList = ["Light", "Fair", "Medium", "Dark"];

const maritalStatusList = ["Single", "Married", "Divorced"];

export default function EditUserBio() {
  const heightDataList = useHeightList(1, 10);
  const weightDataList = useWeightList(10, 100);
  let genderList: string[] = [];
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [heightModalOpen, setHeightModalOpen] = useState<boolean>(false);
  const [weightModalOpen, setWeightModalOpen] = useState<boolean>(false);

  const {
    data: genderData,
    isLoading: genderIsLoading,
    isError: genderIsError,
    error: genderError,
    isSuccess: genderIsSuccess,
  } = useGetGenderListQuery(undefined);
  const {
    data: userDetails,
    isLoading: userDetailsLoading,
    error: userDetailsError,
    isError: userDetailsIsError,
    isSuccess: userDetailsIsSuccess,
  } = useGetUserDetailsQuery(undefined);

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
      heightINC: userDetails?.heightINC ?? "",
      heightCM: userDetails?.heightCM ?? "",
      weight: userDetails?.weight ?? "",
      skinTone: userDetails?.skinTone ?? "",
      gender: userDetails?.gender ?? "",
      maritalStatus: userDetails?.maritalStatus ?? "",
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
                <Text color="white">User bio updated successfully!</Text>
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
                {error?.data?.message}
              </Box>
            );
          },
        });
      }
    },
  });

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = formik;

  if (!genderIsLoading && genderIsSuccess) {
    genderData.map((gender: any) => {
      genderList.push(gender.gender);
    });
  }

  useEffect(() => {
    if (userDetails) {
      setFieldValue("heightINC", userDetails.heightINC);
      setFieldValue("heightCM", userDetails.heightCM);
      setFieldValue("weight", userDetails.weight);
      setFieldValue("skinTone", userDetails.skinTone);
      setFieldValue("gender", userDetails.gender);
      setFieldValue("maritalStatus", userDetails.maritalStatus);
      setProfileImageDetails({
        uri: userDetails.profilePic,
      });
    }
  }, [userDetails]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  if (userDetailsLoading || userDetailsIsError) {

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
            onPress={() => SheetManager.show("bio")}
          />
        </HStack>

        <Text fontSize="lg" fontWeight={700} mt="30px">
          Bio
        </Text>
        <Pressable onPress={() => setHeightModalOpen(true)}>
          <OutLineButton
            onPress={() => setHeightModalOpen(true)}
            placeholder="Height (FT.Inc)"
            value={values.heightINC}
          />
          <ScrollableHeightWeight
            title="Select Height"
            isOpen={heightModalOpen}
            setIsOpen={setHeightModalOpen}
            setValue={(item) => setFieldValue("heightINC", item)}
            value={values.heightINC}
            data={heightDataList}
          />
        </Pressable>
        <Pressable onPress={() => setWeightModalOpen(true)}>
          <OutLineButton
            onPress={() => setWeightModalOpen(true)}
            placeholder="Weight (kg)"
            value={values.weight}
          />
          <ScrollableHeightWeight
            title="Select Weight"
            isOpen={weightModalOpen}
            setIsOpen={setWeightModalOpen}
            setValue={(item) => setFieldValue("weight", item)}
            value={values.weight}
            data={weightDataList}
          />
        </Pressable>
        <CustomActionsheetList
          handelEvent={setFieldValue}
          actionList={skinToneList}
          value={values.skinTone}
          placeholder="Skin Tone"
          fieldName="skinTone"
        />
        <CustomActionsheetList
          handelEvent={setFieldValue}
          actionList={genderList}
          value={values.gender}
          placeholder="Gender"
          fieldName="gender"
        />
        <CustomActionsheetList
          handelEvent={setFieldValue}
          actionList={maritalStatusList}
          value={values.maritalStatus}
          placeholder="Marital Status"
          fieldName="maritalStatus"
        />
        <Button mt="20px" variant={"primary"} onPress={handleSubmit}>
          {loading ? "Please wait..." : "Update"}
        </Button>
        <CustomLoadingModal modalVisible={loading} />
      </VStack>
      <SelectInputImageTypeSheet
        sId="bio"
        setAsset={(res) => {
          setProfileImageDetails({
            name: res?.assets?.[0]?.fileName,
            type: res?.assets?.[0]?.type,
            uri: res?.assets?.[0]?.uri,
          });
        }}
      />
    </KeyboardAwareView>
  );
}
