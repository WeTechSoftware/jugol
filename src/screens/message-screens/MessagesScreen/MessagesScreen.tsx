import { BASE_URL } from "@config";
import { useNavigation } from "@react-navigation/native";
import { messageRoutes } from "@routes/index";
import {
  messageApiSlice,
  useGetConversationsQuery,
} from "@store/api/messageApi/messageApiSlice";
import { selectIdToken, selectUID } from "@store/features/auth/authSlice";
import { fontSizes } from "@typography";
import MessageRenderItem from "@ui/MessageRenderItem/MessageRenderItem";
import SearchInput from "@ui/SearchInput/SearchInput";
import StoryCardRounded from "@ui/StoryCardRounded/StoryCardRounded";
import getSocket from "@utils/socketClient";
import { Center, FlatList, HStack, Skeleton, Text, VStack } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import SettingButtonWithIcon from "../../../components/SettingButtonWithIcon/SettingButtonWithIcon";
import { IConversationProps } from "./MessageScreen.types";

const EmptyConversation = () => {
  return (
    <VStack flex={1} bg="white" justifyContent="center" alignItems="center">
      <Text color="danger.600" fontSize="lg" textAlign="center">
        Conversation list is empty!
      </Text>
    </VStack>
  );
};

export default function MessagesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, handleSearchText] = useState<string>("");

  const {
    data: conversations,
    error: conversationsError,
    isLoading: conversationsIsLoading,
    isError: conversationsIsError,
  } = useGetConversationsQuery(undefined);

  const uid = useSelector(selectUID);

  const loadMoreConverSations = () => {
    const pageNumber = conversations?.pageNumber;
    const pageSize = conversations?.pageSize;
    const totalPages = conversations?.totalPages;

    if (pageNumber < totalPages) {
      dispatch(
        messageApiSlice?.endpoints?.getInfiniteConversations?.initiate({
          pageSize,
          pageNumber: pageNumber + 1,
        })
      );
    }
  };

  const sortedConversationsData: IConversationProps[] = conversations?.data
    ?.slice()
    ?.sort((prev, next) => new Date(next.createdAt) - new Date(prev.createdAt));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SettingButtonWithIcon
          routeName={messageRoutes.messageSettingScreen.path}
        />
      ),
    });
  }, []);

  if (conversationsIsLoading) {
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
              <Skeleton size="20" rounded="full" />
              <Skeleton size="20" rounded="full" />
              <Skeleton size="20" rounded="full" />
              <Skeleton size="20" rounded="full" />
            </HStack>
            <Skeleton h="20" />
            <Skeleton h="20" />
            <Skeleton h="20" />
            <Skeleton h="20" />
            <Skeleton h="20" />
          </VStack>
        </Center>
      </VStack>
    );
  }

  return (
    <>
      <VStack flex={1} bg={"white"} pt={"20px"}>
        {sortedConversationsData?.length > 0 ? (
          <VStack flex={1}>
            <FlatList
              ListHeaderComponent={() => (
                <VStack space="4">
                  <SearchInput
                    searchText={searchText}
                    handleSearchText={handleSearchText}
                  />
                  <StoryCardRounded
                    conversationList={sortedConversationsData}
                  />
                  <Text fontWeight={700} fontSize={fontSizes.md}>
                    Messages
                  </Text>
                </VStack>
              )}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical
              data={sortedConversationsData}
              renderItem={({ item }: any) => <MessageRenderItem {...item} />}
              keyExtractor={(item) => item?.userID}
              onEndReached={loadMoreConverSations}
              onEndReachedThreshold={0.3}
            />
          </VStack>
        ) : (
          <EmptyConversation />
        )}
      </VStack>
    </>
  );
}
