import { ThreeDots } from "@assets/svg/icons";
import { useNavigation } from "@react-navigation/native";
import { dashBoardRoutes, messageRoutes } from "@routes/index";
import {
  useAddBlockMutation,
  useDeleteBlockMutation,
} from "@store/api/blockApi/blockApiSlice";
import { useDeleteConversationMutation } from "@store/api/messageApi/messageApiSlice";
import { fontSizes } from "@typography";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import moment from "moment";
import {
  Avatar,
  Badge,
  Button,
  Factory,
  HStack,
  Modal,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, TouchableHighlight } from "react-native";
import { TouchableOpacity } from "react-native";
import { IConversationProps } from "../../screens/message-screens/MessagesScreen/MessageScreen.types";

const FTouchableHighlight = Factory(TouchableHighlight);

export default function MessageRenderItem(props: IConversationProps) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const user2 = { user2: props?.userID };
  const [addBlock, addResult] = useAddBlockMutation();
  const [deleteBlock, deleteResult] = useDeleteBlockMutation();
  const [deleteConversation, deleteConvResult] =
    useDeleteConversationMutation();
  const [loading, setLoading] = useState(false);

  const blockingUser = async () => {
    try {
      return Alert.alert(
        `${props.isBlocked ? "Unblock or Delete" : "Block or Delete"}`,
        `Do you want to ${
          props.isBlocked ? "unblock or delete " : "block or delete "
        } ${props.name} ?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              setLoading(true);
              await deleteConversation(user2.user2);
              setLoading(false);
            },
          },
          {
            text: props.isBlocked ? "Unblock" : "Block",
            onPress: async () => {
              setLoading(true);
              props?.isBlocked ? await deleteBlock(user2) : blockUser();
              setLoading(false);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  const imageSrc = props?.profilePic
    ? {
        uri: props?.profilePic,
      }
    : undefined;

  const blockUser = async () => {
    setLoading(true);
    await addBlock(user2);
    setLoading(false);
  };

  return (
    <FTouchableHighlight
      activeOpacity={0.2}
      underlayColor="#DDDDDD"
      py="2"
      onLongPress={blockingUser}
      onPress={() => {
        !props?.blockedByYou && props?.blockedBySomeone
          ? Alert.alert(
              `Blocked By ${props?.name}`,
              `You can't send any message!`,
              [{ text: "OK" }]
            )
          : props?.isBlocked
          ? Alert.alert(
              `Unblock or Delete`,
              `Do you want to unblock or delete ${props.name} ?`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  onPress: async () => {
                    setLoading(true);
                    await deleteConversation(user2.user2);
                    setLoading(false);
                  },
                },
                {
                  text: "Unblock",
                  onPress: async () => {
                    setLoading(true);
                    await deleteBlock(user2);
                    setLoading(false);
                  },
                },
              ]
            )
          : navigation.navigate(
              "ChatScreen" as never,
              {
                id: props?.userID,
                currentUser: props?.currentUser,
                isActive: props?.isActive,
              } as never
            );
      }}
    >
      <>
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar source={imageSrc} size={"md"} bg={"blue.700"}>
            <Text
              fontSize={fontSizes.md}
              numberOfLines={1}
              adjustsFontSizeToFit
              maxFontSizeMultiplier={1}
              color="white"
              fontWeight={700}
            >
              {props?.name?.slice(0, 2)?.toUpperCase()}
            </Text>
            {props?.isActive ? <Avatar.Badge bg="green.500" /> : null}
          </Avatar>
          <VStack>
            <Text fontSize={fontSizes.xs} fontWeight={700}>
              {props?.name}
            </Text>
            <Text
              fontSize={fontSizes.xs}
              color={
                props?.isBlocked ||
                props?.blockedBySomeone ||
                props?.blockedByYou
                  ? "red.700"
                  : "black"
              }
              fontWeight={400}
            >
              {props?.isBlocked ||
              props?.blockedBySomeone ||
              props?.blockedByYou
                ? "Blocked"
                : props?.lastMessage
                ? props?.lastMessage?.slice(0, 25)
                : "File"}
            </Text>
          </VStack>
          <Spacer />
          <VStack>
            <Text
              fontSize={fontSizes["2xs"]}
              color={"#ADAFBB"}
              fontWeight={700}
            >
              {moment(props?.createdAt).format("LT")}
            </Text>
            {props?.unread > 0 ? (
              <Badge
                bg="primary.100"
                rounded="full"
                zIndex={1}
                variant="solid"
                alignSelf="flex-end"
                _text={{
                  fontSize: fontSizes["2xs"],
                }}
              >
                {props?.unread}
              </Badge>
            ) : null}
          </VStack>
          <VStack justifyContent="center">
            <TouchableOpacity onPress={blockingUser}>
              <ThreeDots
                style={{
                  height: 25,
                  tintColor: "gray",
                  width: 15,
                  marginLeft: 5,
                }}
              />
            </TouchableOpacity>
          </VStack>
          <CustomLoadingModal modalVisible={loading} />
        </HStack>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>{props?.name}</Modal.Header>
            <Modal.Body my="20px" mx={props?.isBlocked ? "0px" : "10px"}>
              <HStack justifyContent="space-between">
                <Button
                  onPress={async () => {
                    setLoading(true);
                    props?.isBlocked ? await deleteBlock(user2) : blockUser();
                    setModalVisible(false);
                    setLoading(false);
                  }}
                >
                  {props?.isBlocked && props?.blockedByYou
                    ? "Unblock"
                    : "Block"}
                </Button>
                <Button
                  colorScheme="secondary"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  Delete
                </Button>
              </HStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </>
    </FTouchableHighlight>
  );
}
