import { useNavigation } from "@react-navigation/native";
import CircleButton from "@ui/CircleButton/CircleButton";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import MaterialTextArea from "@ui/MaterialTextArea/MaterialTextArea";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Center,
  HStack,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import SelectInputImageTypeSheet, {
  IMAGE_INPUT_SHEET_ID,
} from "../../../action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet";
import { IProfilePictureDetails } from "@screens/auth-screens/ProfilePersonalDetailsScreen/ProfilePersonalDetails.types";
import {
  useAddUserProfileMutation,
  useGetUserDetailsQuery,
  useUpdateUserDataMutation,
} from "@store/api/userApi/userApiSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import { useSelector } from "react-redux";
import {
  selectLoading,
  selectUserProfile,
} from "@store/features/user/userSlice";
import { DEFAULT_IMAGE } from "@config";

export default function EditUserPartnerDetails() {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const userProfile = useSelector(selectUserProfile);
  const userProfileLoading = useSelector(selectLoading);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

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
      expectationFromPartner: "",
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
          await addProfilePicture(formData).unwrap();
        }
        await updateUserData(value).unwrap();
        navigation.goBack();
        setLoading(false);
        toast.show({
          placement: "bottom",
          render: () => {
            return (
              <Box bg="primary.100" px="2" py="2" rounded="sm">
                <Text color="white">
                  Expectation from partner details updated successfully!
                </Text>
              </Box>
            );
          },
        });
      } catch (error: any) {
        setLoading(false);
        console.log(error.data.message);
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
  });

  const {
    values,
    touched,
    handleSubmit,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (userProfile) {
      setFieldValue(
        "expectationFromPartner",
        userProfile.expectationFromPartner
      );
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

  if (userProfileLoading) {
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
            onPress={() => SheetManager.show(IMAGE_INPUT_SHEET_ID)}
          />
        </HStack>
        <VStack mb="20px">
          <Text fontSize="lg" fontWeight={700} my={"10px"}>
            Expectation From Partner
          </Text>
          <MaterialTextArea
            label={"Expectation From Partner"}
            value={values.expectationFromPartner}
            onBlur={handleBlur("expectationFromPartner")}
            multiline
            onChangeText={handleChange("expectationFromPartner")}
          />
        </VStack>
        <Button variant={"primary"} onPress={handleSubmit}>
          {loading ? "Please wait..." : "Update"}
        </Button>
      </VStack>
      <SelectInputImageTypeSheet
        setAsset={(res) => {
          setProfileImageDetails({
            name: res?.assets?.[0]?.fileName,
            type: res?.assets?.[0]?.type,
            uri: res?.assets?.[0]?.uri,
          });
        }}
      />
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
