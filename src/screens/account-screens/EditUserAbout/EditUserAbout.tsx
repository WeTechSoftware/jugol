import CircleButton from "@ui/CircleButton/CircleButton";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
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
import React, { useState, useEffect } from "react";
import {
  useAddUserProfileMutation,
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
import { useSelector } from "react-redux";
import {
  selectLoading,
  selectUserProfile,
} from "@store/features/user/userSlice";
import { DEFAULT_IMAGE } from "@config";

export default function EditUserAbout() {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const userProfile = useSelector(selectUserProfile);
  const userProfileLoading = useSelector(selectLoading);

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
      userAbout: "",
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
                <Text color="white">User about updated successfully!</Text>
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

  const { values, handleChange, setFieldValue, handleSubmit, handleBlur } =
    formik;

  useEffect(() => {
    if (userProfile) {
      setFieldValue("userAbout", userProfile.userAbout);
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
      <VStack bg="white" mt={"-25px"} borderTopRadius={"30px"} px="40px">
        <HStack mt={"-35px"} alignSelf={"center"}>
          <CircleButton
            bgColor="#AF0DBD"
            circleSize="72px"
            iconColor="white"
            icon="camera"
            iconSize={35}
            onPress={() => SheetManager.show("about")}
          />
        </HStack>

        <Text fontSize="lg" fontWeight={700} mb={"20px"}>
          About Me
        </Text>
        <MaterialTextArea
          label={"About you"}
          value={values.userAbout}
          onBlur={handleBlur("userAbout")}
          multiline
          onChangeText={handleChange("userAbout")}
        />

        <Button mt="20px" variant={"primary"} onPress={handleSubmit}>
          {loading ? "Please wait..." : "Update"}
        </Button>
      </VStack>
      <SelectInputImageTypeSheet
        sId="about"
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
