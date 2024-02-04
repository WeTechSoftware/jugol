import CallActionSheet from "@action-sheets/CallActionSheet/CallActionSheet";
import { useKeyboardVisible } from "@hooks/useKeyboardVisible";
import { useNavigation, useRoute } from "@react-navigation/native";
import { dashBoardRoutes, messageRoutes } from "@routes/index";
import {
  messageApiSlice,
  useCallUserMutation,
  useGetMessageQuery,
  useSendMessageMutation,
} from "@store/api/messageApi/messageApiSlice";
import { selectUID } from "@store/features/auth/authSlice";
import ChatHeader from "@ui/ChatHeader/ChatHeader";
import { Box, Center, HStack, Skeleton, useToast, VStack } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { BackHandler, Keyboard, TouchableWithoutFeedback } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { Avatar, GiftedChat, IMessage } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import RenderBubble from "../../../components/RenderBubble/RenderBubble";
import RenderInputToolbar from "../../../components/RenderInputToolbar/RenderInputToolbar";
import { IMessageProps } from "./ChatScreen.types";

export default function ChatScreen() {
  const route = useRoute();
  const { id, currentUser, isActive } = route?.params as {
    id: string;
    currentUser: string;
    isActive: boolean;
  };
  const uid = useSelector(selectUID);
  const dispatch = useDispatch();
  const toast = useToast();
  const isKeyboardVisible = useKeyboardVisible();

  const {
    data: messageList,
    error: messageListError,
    isLoading: messageListIsLoading,
    isError: messageListIsError,
    isSuccess: messageListIsSuccess,
  } = useGetMessageQuery(id);

  const [sendMessage, result] = useSendMessageMutation();
  const [callUser, callResult] = useCallUserMutation();
  const navigation = useNavigation();

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (!navigation.canGoBack()) {
      navigation.replace(dashBoardRoutes.bottomTab.path as never);
    }
    return null;
  });

  const loadMoreMessages = () => {
    const pageNumber = messageList?.data?.pageNumber;
    const pageSize = messageList?.data?.pageSize;
    const totalPages = messageList?.data?.totalPages;
    if (pageNumber < totalPages) {
      dispatch(
        messageApiSlice?.endpoints?.getInfiniteMessage?.initiate({
          id,
          pageSize,
          pageNumber: pageNumber + 1,
        })
      );
    }
  };

  const chatList: IMessage[] = messageList?.data?.messages?.map((message) => ({
    _id: message._id,
    text: message.message,
    user: {
      _id: message?.sender?._id,
      name: message?.sender?.firstName + " " + message?.sender?.lastName,
      avatar: message?.sender?.profilePic,
    },
    createdAt: new Date(message.createdAt),
    image: JSON.stringify(message?.files),
    sent: message?.sender?._id === result?.data?.data?.sender?._id,
    received: message?.sender?._id !== result?.data?.data?.sender?._id,
  }));

  const sortedMessages = chatList
    ?.slice()
    ?.sort(
      (prev, next) => new Date(next?.createdAt) - new Date(prev?.createdAt)
    );

  const handleAudioCall = async () => {
    try {
      SheetManager.hide("callActionSheet");
      const result = await callUser({ reciver: id }).unwrap();
      const saveCallInfo = result?.data?.saveCallInfo;
      const callDetails = result?.data?.callDetails;

      navigation.navigate(
        dashBoardRoutes.ringingScreen.path as never,
        { saveCallInfo, callDetails } as never
      );
    } catch (error) {
      console.log(error);
      toast.show({
        placement: "bottom",
        render: () => {
          return (
            <Box bg="danger.200" px="2" py="2" rounded="sm">
              You already in a call! Please cancel your call.
            </Box>
          );
        },
      });
    }
  };

  useLayoutEffect(() => {
    if (messageList) {
      navigation.setOptions({
        headerLeft: () => (
          <ChatHeader
            user={messageList.data.reciverDetails}
            isActive={isActive}
          />
        ),
      });
    }
  }, [messageList]);

  if (messageListIsLoading) {
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

  const renderTime = () => {
    return null;
  };

  const onSubmit = async ({ text, image }: IMessageProps) => {
    let message = new FormData();
    message.append("reciver", id);
    if (text) {
      message.append("message", text);
    }
    if (image && image?.length > 0) {
      for (let i = 0; i < image.length; i++) {
        const imageName = image[i]?.fileName;
        const imageType = image[i]?.type;
        const imgeData = {
          name: imageName,
          type: imageType,
          uri: image[i].uri,
        };
        message.append(`images${i + 1}`, imgeData);
      }
    }
    await sendMessage(message);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      disabled={!isKeyboardVisible}
    >
      <VStack flex={1} bg="white">
        <GiftedChat
          messages={sortedMessages}
          renderBubble={(props) => <RenderBubble {...props} />}
          renderTime={renderTime}
          renderInputToolbar={(props) => (
            <RenderInputToolbar onSubmit={onSubmit} {...props} />
          )}
          infiniteScroll={true}
          keyboardShouldPersistTaps="always"
          listViewProps={{
            onEndReached: () => {
              loadMoreMessages();
            },
            onEndReachedThreshold: 0.3,
          }}
          renderAvatar={(props) => {
            return (
              <Avatar
                {...props}
                containerStyle={{
                  left: {
                    marginBottom: 35,
                  },
                }}
              />
            );
          }}
          user={{
            _id: currentUser,
          }}
        />
        <CallActionSheet
          handleAudioCall={handleAudioCall}
          sheetId="callActionSheet"
          payload={false}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}
