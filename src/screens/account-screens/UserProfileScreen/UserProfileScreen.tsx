import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Center, HStack, Skeleton, useToast, VStack } from "native-base";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import AboutUser from "@ui/AboutUser/AboutUser";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import UserBioDetails from "@ui/UserBioDetails/UserBioDetails";
import UserInterests from "@ui/UserInterests/UserInterests";
import UserFamilyDetails from "@ui/UserFamily&PartnerDetails/UserFamilyDetails";
import UserPartnerDetails from "@ui/UserFamily&PartnerDetails/UserPartnerDetails";
import LikedProfileGalleryCard from "@ui/LikedProfileGalleryCard/LikedProfileGalleryCard";
import { useGetUserDetailsQuery } from "@store/api/userApi/userApiSlice";
import { getUserAge } from "@utils/getUserAge";
import { useSelector } from "react-redux";
import {
  selectLoading,
  selectUserProfile,
} from "@store/features/user/userSlice";
import { DEFAULT_IMAGE } from "@config";

export default function UserProfileScreen() {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const toast = useToast();
  const userProfile = useSelector(selectUserProfile);
  const loading = useSelector(selectLoading);

  let userAge = 0;
  let heightCM = "";

  if (!loading) {
    userAge = getUserAge(new Date(userProfile?.birthDate));

    if (userProfile?.heightINC) {
      let splitData = userProfile?.heightINC?.split(" ");
      if (splitData?.length > 1) {
        let parseData = parseFloat(
          splitData[0]?.split(`'`)[0] + "." + splitData[1]?.split(`"`)[0]
        );
        heightCM = (parseData * 30.48).toFixed(0);
      } else {
        let parseData = parseFloat(splitData[0]?.split(`'`)[0]);
        heightCM = (parseData * 30.48).toFixed(0);
      }
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  if (loading) {
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
            userProfile?.profilePic
              ? { uri: userProfile?.profilePic }
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
        <VStack my={"20px"}>
          <AboutUser
            userName={userProfile?.firstName + " " + userProfile?.lastName}
            age={userAge}
            profession={userProfile?.profession}
            location={userProfile?.cityName + ", " + userProfile?.countryName}
            about={userProfile?.userAbout}
          />
          <UserBioDetails
            heightINC={userProfile?.heightINC}
            heightCM={heightCM}
            weight={userProfile?.weight}
            gender={userProfile?.gender}
            livingCountry={userProfile?.countryName}
            maritalStatus={userProfile?.maritalStatus}
            skinTone={userProfile?.skinTone}
          />
          {userProfile?.interests.length !== 0 ? (
            <UserInterests interestList={userProfile?.interests} />
          ) : null}
          {userProfile?.familyDetails !== "" && (
            <UserFamilyDetails value={userProfile?.familyDetails} />
          )}
          {userProfile?.expectationFromPartner !== "" && (
            <UserPartnerDetails value={userProfile?.expectationFromPartner} />
          )}
          <LikedProfileGalleryCard galleryPicture={userProfile?.gallery} />
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}
