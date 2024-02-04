import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Center, HStack, Skeleton, VStack } from "native-base";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import { Image, Alert } from "react-native";
import { Dimensions } from "react-native";
import TextWithIcon from "@ui/TextWithIcon/TextWithIcon";
import { accountRoutes } from "@routes/index";
import SelectInputImageTypeSheet from "@action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet";
import { IProfilePictureDetails } from "@screens/auth-screens/ProfilePersonalDetailsScreen/ProfilePersonalDetails.types";
import {
  useGetUserDetailsQuery,
  useResetUserDetailsMutation,
} from "@store/api/userApi/userApiSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import { DEFAULT_IMAGE } from "@config";

export default function UserEditableProfileScreen() {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    data: userDetails,
    isLoading: userDetailsLoading,
    error: userDetailsError,
    isError: userDetailsIsError,
    isSuccess: userDetailsIsSuccess,
  } = useGetUserDetailsQuery(undefined);
  const [resetUserDetails, result] = useResetUserDetailsMutation();
  const [profileImageDetails, setProfileImageDetails] =
    useState<IProfilePictureDetails>({
      name: "",
      type: "",
      uri: "",
    });

  const resetAccount = async () => {
    try {
      setLoading(true);
      const resetData = await resetUserDetails(undefined).unwrap();
      Alert.alert("Successfully reset your profile!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (userDetails) {
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
        <VStack pt="20px">
          <TextWithIcon
            borderBottomWidth={1}
            py="8px"
            borderBottomColor="gray.100"
            title="Basic"
            onPress={() =>
              navigation.navigate(accountRoutes.basicInfo.path as never)
            }
          />
          <TextWithIcon
            borderBottomWidth={1}
            py="8px"
            borderBottomColor="gray.100"
            title="About Me"
            fontSize="lg"
            onPress={() =>
              navigation.navigate(accountRoutes.userAbout.path as never)
            }
          />
          <TextWithIcon
            borderBottomWidth={1}
            py="8px"
            borderBottomColor="gray.100"
            title="Bio"
            fontSize="lg"
            onPress={() =>
              navigation.navigate(accountRoutes.userBio.path as never)
            }
          />
          <TextWithIcon
            borderBottomWidth={1}
            py="8px"
            borderBottomColor="gray.100"
            title="Interests"
            fontSize="lg"
            onPress={() =>
              navigation.navigate(accountRoutes.userInterests.path as never)
            }
          />
          <TextWithIcon
            borderBottomWidth={1}
            py="8px"
            borderBottomColor="gray.100"
            title="Family Details"
            fontSize="lg"
            onPress={() =>
              navigation.navigate(accountRoutes.userFamily.path as never)
            }
          />
          <TextWithIcon
            borderBottomWidth={1}
            py="8px"
            borderBottomColor="gray.100"
            title="Expectations from life partner"
            fontSize="lg"
            onPress={() =>
              navigation.navigate(accountRoutes.userPartner.path as never)
            }
          />
          <TextWithIcon
            title="Gallery"
            fontSize="lg"
            onPress={() =>
              navigation.navigate(accountRoutes.userGallery.path as never)
            }
          />
        </VStack>
        <Button
          variant={"primary"}
          mt="20px"
          onPress={() =>
            navigation.navigate(accountRoutes.userProfile.path as never)
          }
        >
          Preview
        </Button>
        {/* <Button
          variant={'outline'}
          borderColor="secondary.400"
          colorScheme="secondary"
          mt="20px"
          onPress={resetAccount}>
          Reset Profile
        </Button> */}
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
