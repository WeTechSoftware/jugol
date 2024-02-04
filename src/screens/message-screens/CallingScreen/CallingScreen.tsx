import colors from "@colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { dashBoardRoutes } from "@routes/index";
import {
  useEndCallMutation,
  useGetRTCTokenQuery,
} from "@store/api/callApi/callApiSlice";
import getSocket from "@utils/socketClient";
import AgoraUIKit, {
  ConnectionData,
  rtcCallbacks,
  StylePropInterface,
} from "agora-rn-uikit";
import React, { useEffect, useMemo, useState } from "react";
import notifee, { AndroidImportance } from "@notifee/react-native";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";

interface callId {
  callChannelId: string;
}

const CallingScreen = () => {
  const navigation = useNavigation();
  const { callChannelId } = useRoute()?.params as callId;
  const [endCall, result] = useEndCallMutation();
  const {
    data: rtcToken,
    isError,
    isLoading,
  } = useGetRTCTokenQuery({
    channelName: callChannelId,
    role: "publisher",
    tokentype: "uid",
    uid: "1",
  });

  if (isLoading) {
    return <CustomLoadingModal modalVisible={isLoading} />;
  }
  const connectionData = {
    appId: "ff8513e5cef1498a8b7b0d0de937ee29",
    channel: callChannelId,
    token: rtcToken,
  };

  if (!callChannelId) {
    return null;
  }

  async function getOngoingNotificationId() {
    const displayedNotifications = await notifee.getDisplayedNotifications();
    const ongoingNotification = displayedNotifications.filter(
      (notification) =>
        notification?.android?.channelId === "call_channel" ||
        notification?.android?.channelId !== "call_channel"
    );

    return ongoingNotification;
  }
  const rtcCallbacks: rtcCallbacks = useMemo(() => {
    return {
      EndCall: async () => {
        await endCall({ callChannelId });
        const ongoingNotification = await getOngoingNotificationId();
        ongoingNotification?.forEach(async (notifee1) => {
          if (notifee1?.id) {
            await notifee.cancelNotification(notifee1?.id);
          }
        });
        navigation.replace(dashBoardRoutes.bottomTab.path as never);
      },
    };
  }, []);

  useEffect(() => {
    notifee.createChannel({
      id: callChannelId + "1",
      name: "Message",
      sound: "default",
      importance: AndroidImportance.HIGH,
    });
    notifee.displayNotification({
      title: "Calling...",
      body: "Tap to view your call",
      subtitle: "Call",
      data: { callChannelId },
      android: {
        channelId: callChannelId + "1",
        timestamp: Date.now(),
        showTimestamp: true,
        showChronometer: true,
        ongoing: true,
        autoCancel: false,
        actions: [
          {
            title: "View",
            pressAction: {
              id: "View",
            },
          },
        ],
      },
    });
  }, []);

  useEffect(() => {
    const socket = getSocket();
    socket.on("endCall", async (data: callId) => {
      if (callChannelId === data.callChannelId) {
        const ongoingNotification = await getOngoingNotificationId();
        ongoingNotification?.forEach(async (notifee1) => {
          if (notifee1?.id) {
            await notifee.cancelNotification(notifee1?.id);
          }
        });
        navigation.replace(dashBoardRoutes.bottomTab.path as never);
      }
    });
  }, []);

  const style: StylePropInterface = {
    localBtnStyles: {
      muteLocalAudio: {
        backgroundColor: colors.primary[100],
        borderColor: colors.primary[100],
      },
      muteLocalVideo: {
        backgroundColor: colors.primary[100],
        borderColor: colors.primary[100],
      },
      switchCamera: {
        backgroundColor: colors.primary[100],
        borderColor: colors.primary[100],
      },
    },
  };

  return (
    <>
      <AgoraUIKit
        styleProps={style}
        connectionData={connectionData}
        rtcCallbacks={rtcCallbacks}
      />
    </>
  );
};

export default CallingScreen;
