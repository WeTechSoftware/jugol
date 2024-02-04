import CircleButton from "@ui/CircleButton/CircleButton";
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
import { useNavigation } from "@react-navigation/native";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { IMAGE_INPUT_SHEET_ID } from "@action-sheets/SelectInputImageTypeSheet/SelectInputType";

import {
  ArtIcon,
  CameraIcon,
  CookingIcon,
  DrinkIcon,
  ExtremeIcon,
  MusicIcon,
  PlayingIcon,
  ShoppingIcon,
  SwimmingIcon,
  TravellingIcon,
  VideogameIcon,
  YogaIcon,
} from "@assets/svg/icons";
import colors from "@colors";
import SelectInputImageTypeSheet from "@action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet";
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

const interestData = [
  {
    id: "1",
    name: "Photography",
    icon: CameraIcon,
  },
  {
    id: "2",
    name: "Shopping",
    icon: ShoppingIcon,
  },
  {
    id: "3",
    name: "Yoga",
    icon: YogaIcon,
  },
  {
    id: "4",
    name: "Cooking",
    icon: CookingIcon,
  },
  {
    id: "5",
    name: "Tennis",
    icon: PlayingIcon,
  },
  {
    id: "6",
    name: "Karaoke",
    icon: MusicIcon,
  },
  {
    id: "7",
    name: "Swimming",
    icon: SwimmingIcon,
  },
  {
    id: "8",
    name: "Traveling",
    icon: TravellingIcon,
  },
  {
    id: "9",
    name: "Art",
    icon: ArtIcon,
  },
  {
    id: "10",
    name: "Extreme",
    icon: ExtremeIcon,
  },
  {
    id: "11",
    name: "Music",
    icon: MusicIcon,
  },
  {
    id: "12",
    name: "Drink",
    icon: DrinkIcon,
  },
  {
    id: "13",
    name: "Video games",
    icon: VideogameIcon,
  },
];

export default function EditUserInterests() {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
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

  const handleSelection = (name: string) => {
    const isAlreadySelected = selectedButtons.includes(name);
    if (isAlreadySelected) {
      const filtredItems = selectedButtons.filter((item) => item !== name);
      setSelectedButtons(filtredItems);
    } else {
      setSelectedButtons((prev) => [...prev, name]);
    }
  };

  const formData = new FormData();

  const handleUserInterests = async () => {
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
      await updateUserData({ interests: selectedButtons }).unwrap();
      navigation.goBack();
      setLoading(false);
      toast.show({
        placement: "bottom",
        render: () => {
          return (
            <Box bg="primary.100" px="2" py="2" rounded="sm">
              <Text color="white">User interests updated successfully!</Text>
            </Box>
          );
        },
      });
    } catch (error: any) {
      setLoading(false);
      console.log(error?.data?.message);
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
  };

  useEffect(() => {
    if (userProfile) {
      setSelectedButtons(userProfile.interests);
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
        <HStack py="20px" flexWrap="wrap" justifyContent="space-between">
          {interestData.map((btnInfo) => {
            const Icon = btnInfo.icon;
            const isSelected = selectedButtons.includes(btnInfo.name);
            return (
              <Button
                borderWidth={"1.5px"}
                borderColor={
                  isSelected ? colors.primary[100] : colors.light[100]
                }
                onPress={() => handleSelection(btnInfo.name)}
                justifyContent={"flex-start"}
                w="47%"
                mb="10px"
                variant={isSelected ? "primary" : "outline"}
                key={btnInfo.id}
              >
                <HStack alignItems={"center"} bg={"transparent"}>
                  <Icon
                    style={{
                      tintColor: isSelected ? "#fff" : "#000",
                    }}
                  />
                  <Text color={isSelected ? "#fff" : "#000"} ml="8.79px">
                    {btnInfo.name}
                  </Text>
                </HStack>
              </Button>
            );
          })}
        </HStack>
        <Button variant={"primary"} onPress={handleUserInterests}>
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
