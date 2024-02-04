/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Center,
  HStack,
  Image,
  ScrollView,
  Skeleton,
  VStack,
} from "native-base";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import AboutUser from "@ui/AboutUser/AboutUser";
import UserBioDetails from "@ui/UserBioDetails/UserBioDetails";
import UserInterests from "@ui/UserInterests/UserInterests";
import LikedProfileGalleryCard from "@ui/LikedProfileGalleryCard/LikedProfileGalleryCard";
import UserFamilyDetails from "@ui/UserFamily&PartnerDetails/UserFamilyDetails";
import UserPartnerDetails from "@ui/UserFamily&PartnerDetails/UserPartnerDetails";
import { Dimensions } from "react-native";
import { useGetSingleUserDetailsQuery } from "@store/api/userApi/userApiSlice";
import CircleButton from "@ui/CircleButton/CircleButton";
import { useAddLikeMutation } from "@store/api/likeApi/likeApiSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSingleUserDetails,
  selectAllUserDetails,
} from "@store/features/user/userSlice";
import { getUserAge } from "@utils/getUserAge";
import { DEFAULT_IMAGE } from "@config";

export default function LikeProfileScreen() {
  const navigation = useNavigation();
  const user = useRoute().params;
  const windowHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  let userAge = 0;
  let heightCM = "";

  userAge = getUserAge(new Date(user?.birthDate));

  if (user?.heightINC) {
    let splitData = user?.heightINC?.split(" ");
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

  return (
    <KeyboardAwareView hideContainer>
      <VStack height={(windowHeight / 2).toString() + "px"} w={"full"}>
        <Image
          alt="profile"
          source={
            user?.profilePic
              ? { uri: user?.profilePic }
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
            aboutMe={false}
            userName={user?.firstName + " " + user?.lastName}
            age={userAge}
            profession={user?.profession}
            location={user?.cityName + ", " + user?.countryName}
            about={user?.userAbout}
          />
          {user?.gallery?.length > 0 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: user?.gallery[0]?.image }}
            />
          ) : null}
          <UserBioDetails
            aboutMe={false}
            name={user?.firstName}
            heightINC={user?.heightINC}
            heightCM={heightCM}
            weight={user?.weight}
            gender={user?.gender}
            livingCountry={user?.countryName}
            maritalStatus={user?.maritalStatus}
            skinTone={user?.skinTone}
          />
          {user?.gallery?.length > 1 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: user?.gallery[1]?.image }}
            />
          ) : null}
          {user?.interests?.length > 0 ? (
            <UserInterests interestList={user?.interests} />
          ) : null}
          {user?.gallery?.length > 2 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: user?.gallery[2]?.image }}
            />
          ) : null}
          {user?.familyDetails ? (
            <UserFamilyDetails value={user?.familyDetails} />
          ) : null}
          {user?.gallery?.length > 3 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: user?.gallery[3]?.image }}
            />
          ) : null}
          {user?.expectationFromPartner ? (
            <UserPartnerDetails value={user?.expectationFromPartner} />
          ) : null}
          {user?.gallery?.length > 3 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: user?.gallery[3]?.image }}
            />
          ) : null}
        </VStack>
      </VStack>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
