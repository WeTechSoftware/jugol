/* eslint-disable react-native/no-inline-styles */
import { Divider, HStack, Image, Pressable, Text, VStack } from "native-base";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import PREMIUM_ICON from "@assets/images/premium.png";
import { ILikedCard } from "./LikedCard.types";
import Feather from "@expo/vector-icons/Feather";
import { SheetManager } from "react-native-actions-sheet";
import CustomLikedMessage from "@ui/CustomLikedMessage/CustomLikedMessage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  useAddLikeMutation,
  useDeleteLikeMutation,
} from "@store/api/likeApi/likeApiSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import { getUserAge } from "@utils/getUserAge";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { dashBoardRoutes } from "@routes/index";

export default function LikedCard({ item, type, isPremium }: ILikedCard) {
  const [addLike, result] = useAddLikeMutation();
  const [deleteLike, deleteResult] = useDeleteLikeMutation();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  let userAge = getUserAge(item?.birthDate);

  const removeLike = async () => {
    Alert.alert(
      "Remove Like",
      `Do you want to remove ${item.firstName} ${item.lastName} from your like list ?`,
      [
        {
          text: "OK",
          onPress: async () => {
            setLoading(true);
            const body = {
              user2: item?._id,
            };
            await deleteLike(body);
            setLoading(false);
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  return (
    <Pressable
      h={"200px"}
      w={"47%"}
      borderRadius={"15px"}
      overflow={"hidden"}
      position="relative"
      mt={"20px"}
      onPress={() => {
        if (type === "likedYou") {
          navigation.navigate("BePremium");
        } else {
          navigation.navigate("LikeProfileScreen", item);
        }
      }}
    >
      <Image
        source={{ uri: item.profilePic }}
        alt={item.firstName}
        h={"full"}
        blurRadius={isPremium || type !== "likedYou" ? 0 : 100}
      />
      {!isPremium ? (
        type === "likedYou" ? (
          <VStack position={"absolute"} flex={1} w="100%">
            <VStack
              alignItems="center"
              h={"200px"}
              justifyContent="center"
              flex={1}
            >
              <Image
                source={PREMIUM_ICON}
                alt="premium"
                h={"25px"}
                w={"30px"}
              />
              <Text color="white" fontSize={"12px"} mt={"5px"}>
                Be Premium
              </Text>
              <Text color="white" fontSize={"12px"}>
                To See
              </Text>
            </VStack>
          </VStack>
        ) : null
      ) : null}
      {type === "likedYou" ? (
        isPremium ? (
          <VStack
            position={"absolute"}
            bottom={0}
            backgroundColor={"rgba(10, 10, 10, 0.5)"}
          >
            <Text color="white" fontSize={"16px"} fontWeight={700} px={"10px"}>
              {item.firstName}, {userAge}
            </Text>
            <Divider opacity={0.3} />
            <HStack px={"16px"} justifyContent={"space-evenly"} w={"full"}>
              {type === "likedYou" || type === "youLiked" ? (
                <>
                  <FontAwesome
                    name="close"
                    color={"white"}
                    size={20}
                    style={{
                      paddingVertical: 10,
                      width: "50%",
                      textAlign: "center",
                    }}
                    onPress={removeLike}
                  />
                  <Divider orientation="vertical" mt="5px" opacity={0.8} />
                </>
              ) : null}
              {type === "likedYou" ? (
                <AntDesign
                  name={item?.status === "liked" ? "heart" : "star"}
                  color={"white"}
                  size={20}
                  onPress={async () => {
                    const body = {
                      user2: item?._id,
                      status: item?.status,
                    };
                    await addLike(body);
                  }}
                  style={{
                    paddingVertical: 10,
                    width: "50%",
                    textAlign: "center",
                  }}
                />
              ) : (
                <Feather
                  name="send"
                  onPress={() => {
                    SheetManager.show(item._id, {
                      payload: item,
                    });
                  }}
                  color={"white"}
                  size={20}
                  style={
                    type === "match"
                      ? {
                          paddingVertical: 10,
                          width: "100%",
                          textAlign: "center",
                        }
                      : {
                          paddingVertical: 10,
                          width: "50%",
                          textAlign: "center",
                        }
                  }
                />
              )}
            </HStack>
          </VStack>
        ) : null
      ) : (
        <VStack
          position={"absolute"}
          bottom={0}
          backgroundColor={"rgba(10, 10, 10, 0.5)"}
        >
          <Text color="white" fontSize={"16px"} fontWeight={700} px={"10px"}>
            {item.firstName}, {userAge}
          </Text>
          <Divider opacity={0.3} />
          <HStack px={"16px"} justifyContent={"space-evenly"} w={"full"}>
            {type !== "match" ? (
              <>
                <FontAwesome
                  name="close"
                  color={"white"}
                  size={20}
                  style={{
                    paddingVertical: 10,
                    width: "50%",
                    textAlign: "center",
                  }}
                  onPress={removeLike}
                />
                {type === "youLiked" ? null : (
                  <Divider orientation="vertical" mt="5px" opacity={0.8} />
                )}
              </>
            ) : null}
            {type === "likedYou" ? (
              <AntDesign
                name={item?.status === "liked" ? "heart" : "star"}
                color={"white"}
                size={20}
                onPress={async () => {
                  setLoading(true);
                  const body = {
                    user2: item?._id,
                    status: item?.status,
                  };
                  await addLike(body);
                  setLoading(false);
                }}
                style={{
                  paddingVertical: 10,
                  width: "50%",
                  textAlign: "center",
                }}
              />
            ) : type === "match" ? (
              <Feather
                name="send"
                onPress={() => {
                  SheetManager.show(item._id, {
                    payload: item,
                  });
                }}
                color={"white"}
                size={20}
                style={
                  type === "match"
                    ? {
                        paddingVertical: 10,
                        width: "100%",
                        textAlign: "center",
                      }
                    : { paddingVertical: 10, width: "50%", textAlign: "center" }
                }
              />
            ) : null}
          </HStack>
        </VStack>
      )}
      <CustomLikedMessage sheetId={item._id} payload={item} />
      <CustomLoadingModal modalVisible={loading} />
    </Pressable>
  );
}
