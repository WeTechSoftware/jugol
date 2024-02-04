import React, { useState } from "react";
import { Center, HStack, Skeleton, Text, VStack } from "native-base";
import LikedScreenButton from "@ui/LikedScreenButton/LikedScreenButton";
import DayBreakDivider from "@ui/DayBreakDivider/DayBreakDivider";
import LikedCardList from "@ui/LikedCardList/LikedCardList";
import { useGetAllLikesQuery } from "@store/api/likeApi/likeApiSlice";
import { selectUID } from "../../../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";

export default function LikeScreen() {
  const [isClicked, setClicked] = useState({
    likedYou: true,
    youLiked: false,
    match: false,
  });
  const {
    data: allLikes,
    isError: likeIsError,
    error: likeError,
    isLoading: likeIsLoading,
  } = useGetAllLikesQuery(undefined);

  const userID = useSelector(selectUID);

  const likedYouData = allLikes
    ?.filter(
      (likes: any) =>
        likes?.user2?.user === userID &&
        (likes?.status === "liked" || likes?.status === "superliked")
    )
    ?.map((likes: any) => {
      if (likes.status === "superliked") {
        return { ...likes?.user1, status: "superliked" };
      } else {
        return { ...likes?.user1, status: "liked" };
      }
    });
  const youLikedData = allLikes
    ?.filter(
      (likes: any) =>
        likes?.user1?.user === userID &&
        (likes?.status === "liked" || likes?.status === "superliked")
    )
    ?.map((likes: any) => {
      if (likes.status === "superliked") {
        return { ...likes?.user2, status: "superliked" };
      } else {
        return { ...likes?.user2, status: "liked" };
      }
    });
  const matchedData = allLikes
    ?.filter(
      (likes: any) =>
        likes?.status === "matched" &&
        (likes?.user1?.user === userID || likes?.user2?.user === userID)
    )
    ?.map((likes: any) =>
      likes?.user1?.user === userID ? likes?.user2 : likes?.user1
    );

  if (likeIsError || likeIsLoading) {
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
            <HStack space="2" mb="10px">
              <Skeleton size="64" w="50%" />
              <Skeleton size="64" w="50%" />
            </HStack>
            <HStack space="2" mb="10px">
              <Skeleton size="64" w="50%" />
              <Skeleton size="64" w="50%" />
            </HStack>
          </VStack>
        </Center>
      </VStack>
    );
  }

  return (
    <VStack flex={1} bg={"white"} px={"40px"}>
      <HStack justifyContent={"space-between"} mt={"25px"} mb={"30px"}>
        <LikedScreenButton
          title="Liked You"
          isClicked={isClicked.likedYou}
          onPress={() => {
            setClicked({
              likedYou: true,
              youLiked: false,
              match: false,
            });
          }}
        />
        <LikedScreenButton
          title="You Liked"
          isClicked={isClicked.youLiked}
          onPress={() => {
            setClicked({
              likedYou: false,
              youLiked: true,
              match: false,
            });
          }}
        />
        <LikedScreenButton
          title="Match"
          isClicked={isClicked.match}
          onPress={() => {
            setClicked({
              likedYou: false,
              youLiked: false,
              match: true,
            });
          }}
        />
      </HStack>
      <DayBreakDivider day="Today" />
      {isClicked.likedYou ? (
        likedYouData.length > 0 ? (
          <LikedCardList data={likedYouData} type="likedYou" isPremium={true} />
        ) : (
          <VStack flex={1} justifyContent="center" alignItems="center">
            <Text fontSize="lg" textAlign="center" color="danger.400">
              No one has liked you yet!
            </Text>
          </VStack>
        )
      ) : null}
      {isClicked.youLiked ? (
        youLikedData.length > 0 ? (
          <LikedCardList data={youLikedData} type="youLiked" />
        ) : (
          <VStack flex={1} justifyContent="center" alignItems="center">
            <Text fontSize="lg" textAlign="center" color="danger.400">
              You have not liked anyone yet.
            </Text>
          </VStack>
        )
      ) : null}
      {isClicked.match ? (
        matchedData.length > 0 ? (
          <LikedCardList data={matchedData} type="match" />
        ) : (
          <VStack flex={1} justifyContent="center" alignItems="center">
            <Text fontSize="lg" textAlign="center" color="danger.400">
              No one has matched with you yet!
            </Text>
          </VStack>
        )
      ) : null}
    </VStack>
  );
}
