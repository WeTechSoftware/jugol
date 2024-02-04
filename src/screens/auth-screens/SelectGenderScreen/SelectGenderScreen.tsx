import { useNavigation } from "@react-navigation/native";
import { authRoutes } from "@routes/index";
import {
  useGetGenderListQuery,
  useUpdateUserDataMutation,
} from "@store/api/userApi/userApiSlice";
import { setCheckUserInformation } from "@store/features/auth/authSlice";
import { fontSizes } from "@typography";
import AuthHeader from "@ui/AuthHeader/AuthHeader";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
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
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";

export default function SelectGenderScreen() {
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const navigation = useNavigation();
  const toast = useToast();
  let genderList: string[] = [];
  const [loading, setLoading] = useState<boolean>(false);

  const [updateUserData, results] = useUpdateUserDataMutation();
  const {
    data: genderData,
    isLoading: genderIsLoading,
    isError: genderIsError,
    error: genderError,
    isSuccess: genderIsSuccess,
  } = useGetGenderListQuery(undefined);

  const dispatch = useDispatch();
  const user = useSelector((autuUser: any) => autuUser.user);

  const handleContinueClick = async () => {
    setLoading(true);
    if (selectedGender !== "") {
      try {
        await updateUserData({ gender: selectedGender }).unwrap();
        setLoading(false);
        toast.show({
          placement: "bottom",
          render: () => {
            return (
              <Box bg="primary.100" px="2" py="2" rounded="sm">
                <Text color="white">Gender added successfully!</Text>
              </Box>
            );
          },
        });
        navigation.navigate(authRoutes.profilePerSonalDetails.path as never);
        dispatch(setCheckUserInformation(true));
      } catch (error: any) {
        setLoading(false);
        console.log(error?.message || "Something went wrong");
        toast.show({
          placement: "bottom",
          render: () => {
            return (
              <Box bg="danger.200" px="2" py="2" rounded="sm">
                {error?.message || "Something went wrong"}
              </Box>
            );
          },
        });
      }
    } else {
      toast.show({
        placement: "bottom",
        render: () => {
          return (
            <Box bg="danger.200" px="2" py="2" rounded="sm">
              Please select your gender!
            </Box>
          );
        },
      });
    }
  };

  if (!genderIsLoading && genderIsSuccess) {
    genderData.map((gender: any) => {
      genderList.push(gender.gender);
    });
  }

  if (genderIsLoading || genderIsError) {
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
    <KeyboardAwareView
      containerStyle={{
        justifyContent: "space-between",
      }}
    >
      <VStack space="20">
        <AuthHeader title="I am a" />
        <VStack space="4">
          {genderList.map((gender: string) => {
            const isSelected = selectedGender === gender;
            return (
              <Pressable
                onPress={() => setSelectedGender(gender)}
                bg={isSelected ? "primary.100" : "transparent"}
                rounded="2xl"
                borderWidth={"1.5px"}
                borderColor={isSelected ? "primary.100" : "light.100"}
                px={"4"}
                py={"3"}
                key={gender}
              >
                <HStack justifyContent="space-between">
                  <Text
                    color={isSelected ? "#fff" : "#000"}
                    fontSize={fontSizes.md}
                    fontWeight={isSelected ? "600" : "400"}
                  >
                    {gender}
                  </Text>
                  <Feather
                    name="check"
                    color={isSelected ? "#fff" : "#ADAFBB"}
                    size={20}
                  />
                </HStack>
              </Pressable>
            );
          })}
        </VStack>
      </VStack>
      <Button onPress={handleContinueClick} variant={"primary"} mt="10">
        {loading ? "Please wait..." : "Continue"}
      </Button>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
