import React from "react";
import { IDiscoverScreen } from "@screens/home-screens/DiscoverScreen/DiscoverScreen.types";
import { HStack, Pressable, Text, VStack } from "native-base";
import { Dimensions, Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { fontSizes } from "@typography";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@colors";
import { useNavigation } from "@react-navigation/native";
import { dashBoardRoutes } from "@routes/index";
import { getUserAge } from "@utils/getUserAge";
import CircleButton from "@ui/CircleButton/CircleButton";
import EmptyCardComponent from "@screens/home-screens/DiscoverScreen/DiscoverComponent/EmptyCardComponent";

const { height } = Dimensions.get("window");

export default function SwiperCard(props: any) {
  const navigation = useNavigation();
  let userAge = getUserAge(props?.userID?.birthDate);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(
          dashBoardRoutes.viewProfile.path as never,
          props?.userID?.user as never
        )
      }
      borderRadius={"15px"}
      overflow={"hidden"}
      w="full"
      shadow={9}
      height={height / 1.4}
      // mx={'20px'}
      bg="white"
    >
      <Image
        source={{ uri: props?.userID?.profilePic }}
        style={{
          height: height / 1.4,
          // maxHeight: 400,
          overflow: "hidden",
          width: "100%",
        }}
      />
      <VStack
        w={"full"}
        position={"absolute"}
        bottom="0px"
        left="0px"
        backgroundColor={"rgba(10, 10, 10, 0.3)"}
      >
        <HStack
          h="160px"
          justifyContent={"space-between"}
          px={"16px"}
          py={"10px"}
        >
          <VStack>
            <Text color={"white"} fontSize={fontSizes.lg} fontWeight={700}>
              {props?.userID?.firstName} {props?.userID?.lastName}, {userAge}
            </Text>
            <Text color={"white"}>{props?.userID?.profession}</Text>
            <Text color={"white"}>{props?.userID?.countryName}</Text>
          </VStack>
          <VStack>
            <AntDesign
              onPress={() =>
                navigation.navigate(
                  dashBoardRoutes.viewProfile.path as never,
                  props?.userID?.user as never
                )
              }
              name="infocirlceo"
              color={colors.primary[100]}
              size={20}
            />
          </VStack>
        </HStack>
      </VStack>
      <HStack
        alignItems={"center"}
        p={"10px"}
        borderRadius={"10px"}
        position={"absolute"}
        top="20px"
        left="16px"
        backgroundColor={"rgba(10, 10, 10, 0.5)"}
      >
        <Entypo name="location-pin" color="white" size={18} />
        <Text color={"white"}>
          {props?.distance?.toString()?.split(".")[0]} km
        </Text>
      </HStack>
    </Pressable>
  );
}
