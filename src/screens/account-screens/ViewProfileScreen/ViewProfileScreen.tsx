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

export default function ViewProfileScreen() {
  const navigation = useNavigation();
  const uid = useRoute().params as { uid: string };
  const windowHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector(selectAllUserDetails);

  const singleUser = userDetails?.data?.filter(
    (user) => user?.userID?.user === uid
  )[0];

  const [addLike, result] = useAddLikeMutation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  let userAge = 0;
  let heightCM = "";

  userAge = getUserAge(new Date(singleUser?.userID?.birthDate));

  if (singleUser?.userID?.heightINC) {
    let splitData = singleUser?.userID?.heightINC?.split(" ");
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

  const handleClose = async () => {
    const body = {
      user2: singleUser?.userID?._id,
      status: "disLiked",
    };
    setLoading(true);
    await addLike(body);
    dispatch(removeSingleUserDetails(singleUser?.userID?._id));
    navigation.goBack();
    setLoading(false);
  };

  const handleHeart = async () => {
    const body = {
      user2: singleUser?.userID?._id,
      status: "liked",
    };
    setLoading(true);
    await addLike(body);
    dispatch(removeSingleUserDetails(singleUser?.userID?._id));
    navigation.goBack();
    setLoading(false);
  };

  const handleStar = async () => {
    const body = {
      user2: singleUser?.userID?._id,
      status: "superliked",
    };
    setLoading(true);
    await addLike(body);
    dispatch(removeSingleUserDetails(singleUser?.userID?._id));
    navigation.goBack();
    setLoading(false);
  };

  return (
    <KeyboardAwareView hideContainer>
      <VStack height={(windowHeight / 2).toString() + "px"} w={"full"}>
        <Image
          alt="profile"
          source={
            singleUser?.userID?.profilePic
              ? { uri: singleUser?.userID?.profilePic }
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
            userName={
              singleUser?.userID?.firstName + " " + singleUser?.userID?.lastName
            }
            age={userAge}
            profession={singleUser?.userID?.profession}
            location={
              singleUser?.userID?.cityName +
              ", " +
              singleUser?.userID?.countryName
            }
            about={singleUser?.userID?.userAbout}
          />
          {singleUser?.userID?.gallery?.length > 0 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: singleUser?.userID?.gallery[0]?.image }}
            />
          ) : null}
          <UserBioDetails
            aboutMe={false}
            name={singleUser?.userID?.firstName}
            heightINC={singleUser?.userID?.heightINC}
            heightCM={heightCM}
            weight={singleUser?.userID?.weight}
            gender={singleUser?.userID?.gender}
            livingCountry={singleUser?.userID?.countryName}
            maritalStatus={singleUser?.userID?.maritalStatus}
            skinTone={singleUser?.userID?.skinTone}
          />
          {singleUser?.userID?.gallery?.length > 1 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: singleUser?.userID?.gallery[1]?.image }}
            />
          ) : null}
          {singleUser?.userID?.interests?.length > 0 ? (
            <UserInterests interestList={singleUser?.userID?.interests} />
          ) : null}
          {singleUser?.userID?.gallery?.length > 2 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: singleUser?.userID?.gallery[2]?.image }}
            />
          ) : null}
          {singleUser?.userID?.familyDetails ? (
            <UserFamilyDetails value={singleUser?.userID?.familyDetails} />
          ) : null}
          {singleUser?.userID?.gallery?.length > 3 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: singleUser?.userID?.gallery[3]?.image }}
            />
          ) : null}
          {singleUser?.userID?.expectationFromPartner ? (
            <UserPartnerDetails
              value={singleUser?.userID?.expectationFromPartner}
            />
          ) : null}
          {singleUser?.userID?.gallery?.length > 3 ? (
            <Image
              alt="1st pic"
              h={"400px"}
              w="full"
              borderRadius={"15px"}
              mt="20px"
              // shadow={7}
              source={{ uri: singleUser?.userID?.gallery[3]?.image }}
            />
          ) : null}

          <VStack my={"40px"}>
            <HStack alignItems={"center"} justifyContent={"space-around"}>
              <CircleButton
                bgColor="white"
                circleSize="78"
                icon={"close"}
                iconColor={"#FF288F"}
                iconSize={30}
                shadow={9}
                onPress={handleClose}
              />
              <CircleButton
                bgColor="white"
                circleSize="90"
                icon={"heart"}
                iconColor={"#AF0DBD"}
                iconSize={40}
                shadow={9}
                onPress={handleHeart}
              />
              <CircleButton
                bgColor="white"
                circleSize="78"
                icon={"star"}
                iconColor={"#FF288F"}
                iconSize={30}
                shadow={9}
                onPress={handleStar}
              />
            </HStack>
          </VStack>
        </VStack>
      </VStack>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
