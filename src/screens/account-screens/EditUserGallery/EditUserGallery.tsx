import { useNavigation } from "@react-navigation/native";
import CircleButton from "@ui/CircleButton/CircleButton";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
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
import { Dimensions, Image } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import SelectInputImageTypeSheet, {
  IMAGE_INPUT_SHEET_ID,
} from "../../../action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet";
import GalleryImageCard from "@ui/GalleryImageCard/GalleryImageCard";
import { IProfilePictureDetails } from "@screens/auth-screens/ProfilePersonalDetailsScreen/ProfilePersonalDetails.types";
import {
  useAddUserProfileMutation,
  useAddUserGalleryMutation,
  useGetUserDetailsQuery,
} from "@store/api/userApi/userApiSlice";
import { IEditUserGallery } from "./EditUserGallery.types";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import { useSelector } from "react-redux";
import {
  selectLoading,
  selectUserProfile,
} from "@store/features/user/userSlice";
import { DEFAULT_IMAGE } from "@config";

export default function EditUserGallery() {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<IEditUserGallery[]>([]);
  const userProfile = useSelector(selectUserProfile);
  const userProfileLoading = useSelector(selectLoading);

  const toast = useToast();

  const [addProfilePicture, profilePicture] = useAddUserProfileMutation();
  const [addUserGallery, userGalleryResults] = useAddUserGalleryMutation();

  const [profileImageDetails, setProfileImageDetails] =
    useState<IProfilePictureDetails>({
      name: "",
      type: "",
      uri: "",
    });

  const profileFormData = new FormData();
  const galleryFormData = new FormData();

  const handleUserGallery = async () => {
    setLoading(true);
    try {
      if (profileImageDetails?.name) {
        profileFormData.append("profilePic", {
          name: profileImageDetails?.name,
          type: profileImageDetails?.type,
          uri: profileImageDetails?.uri,
        });
        await addProfilePicture(profileFormData).unwrap();
      }
      if (images.length > 0) {
        images.map((image) =>
          galleryFormData.append(image.fieldName, {
            name: image.name,
            type: image.type,
            uri: image.uri,
          })
        );
        await addUserGallery(galleryFormData);
      }
      setLoading(false);
      toast.show({
        placement: "bottom",
        render: () => {
          return (
            <Box bg="primary.100" px="2" py="2" rounded="sm">
              <Text color="white">User gallery updated successfully!</Text>
            </Box>
          );
        },
      });
      navigation.goBack();
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
  };

  useEffect(() => {
    if (userProfile && userProfile.gallery.length > 0) {
      userProfile.gallery.map((image: any) => {
        setImages((oldImages: any) => [
          ...oldImages,
          {
            uri: image?.image,
            name: image.image.split("/").pop(),
            type: `image/${image.image.split("/").pop().split(".").pop()}`,
            fieldName: image.fieldName,
            id: image._id,
          },
        ]);
      });
    }
    setProfileImageDetails({
      uri: userProfile.profilePic,
    });
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
            onPress={() => SheetManager.show("gallery")}
          />
        </HStack>
        <VStack mt={"30px"} mb="20px">
          <Text fontSize={"16px"} fontWeight={700}>
            Gallery
          </Text>

          <HStack mt="10px" justifyContent={"space-between"}>
            <GalleryImageCard
              edit={true}
              image={
                images
                  ? images.filter((image) => image.fieldName === "image1")[0]
                  : undefined
              }
              index={0}
              images={images}
              setImages={setImages}
              iconSize={50}
              boxHeight="190px"
              boxWidth={"47%"}
              fieldName="image1"
              onPress={() => SheetManager.show("image1")}
            />
            <GalleryImageCard
              edit={true}
              image={
                images
                  ? images.filter((image) => image.fieldName === "image2")[0]
                  : undefined
              }
              index={1}
              images={images}
              setImages={setImages}
              iconSize={50}
              boxHeight="190px"
              boxWidth={"47%"}
              fieldName="image2"
              onPress={() => SheetManager.show("image2")}
            />
          </HStack>
          <HStack mt="10px" justifyContent={"space-between"}>
            <GalleryImageCard
              edit={true}
              image={
                images
                  ? images.filter((image) => image.fieldName === "image3")[0]
                  : undefined
              }
              index={2}
              images={images}
              setImages={setImages}
              iconSize={40}
              boxHeight="120px"
              boxWidth={"30%"}
              fieldName="image3"
              onPress={() => SheetManager.show("image3")}
            />
            <GalleryImageCard
              edit={true}
              image={
                images
                  ? images.filter((image) => image.fieldName === "image4")[0]
                  : undefined
              }
              index={3}
              images={images}
              setImages={setImages}
              iconSize={40}
              boxHeight="120px"
              boxWidth={"30%"}
              fieldName="image4"
              onPress={() => SheetManager.show("image4")}
            />
            <GalleryImageCard
              edit={true}
              image={
                images
                  ? images.filter((image) => image.fieldName === "image5")[0]
                  : undefined
              }
              index={4}
              images={images}
              setImages={setImages}
              iconSize={40}
              boxHeight="120px"
              boxWidth={"30%"}
              fieldName="image5"
              onPress={() => SheetManager.show("image5")}
            />
          </HStack>
        </VStack>
        <Button
          variant={"primary"}
          disabled={loading}
          onPress={handleUserGallery}
        >
          {loading ? "Please wait..." : "Update"}
        </Button>
      </VStack>
      <SelectInputImageTypeSheet
        sId="gallery"
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
