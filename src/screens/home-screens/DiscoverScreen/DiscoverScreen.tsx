import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Platform,
  RefreshControl,
  useWindowDimensions,
} from "react-native";

import useFcmToken from "@hooks/useFcmToken";
import notifee, { AndroidImportance } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { useNavigation, useRoute } from "@react-navigation/native";
import { dashBoardRoutes, homeRoutes } from "@routes/index";
import { useAddLikeMutation } from "@store/api/likeApi/likeApiSlice";
import {
  useAddUserLocationMutation,
  useGetAllUserQuery,
} from "@store/api/userApi/userApiSlice";
import {
  selectCheckNotificationPermission,
  selectUID,
} from "@store/features/auth/authSlice";
import CircleButton from "@ui/CircleButton/CircleButton";
import FilterButton from "@ui/FilterButton/FilterButton";
import SwiperCard from "@ui/SwiperCard/SwiperCard";
import getSocket from "@utils/socketClient";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "native-base";
import Swiper from "react-native-deck-swiper";
import Geolocation from "react-native-geolocation-service";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";
import EmptyCardComponent from "./DiscoverComponent/EmptyCardComponent";
import SwiperElement from "./DiscoverComponent/SwiperElement";
import {
  selectfilterData,
  setFilterData,
} from "@store/features/filterSlice/filterSlice";
import {
  removeSingleUserDetails,
  selectAllUserDetails,
  selectLoading,
} from "@store/features/user/userSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import colors from "@colors";

export default function DiscoverScreen() {
  const [index, setIndex] = React.useState<number>(0);
  const [isCardEmpty, setCardEmpty] = React.useState<boolean>(false);
  const swiperRef = React.createRef<any>();
  const { width, height } = useWindowDimensions();
  const [addUserLocation, results] = useAddUserLocationMutation();
  const [addLike, result] = useAddLikeMutation();
  const filterData = useSelector(selectfilterData);
  const userDetails = useSelector(selectAllUserDetails);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const toast = useToast();

  console.log({ filterData })

  useFcmToken();

  const checkLocationPermission = async () => {
    let isGranted = false;
    let isGrantedBackground = false;
    if (Platform.OS === "ios") {
      let iOSPermission = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
      isGranted = iOSPermission === RESULTS.GRANTED;
    }
    if (Platform.OS === "android") {
      let permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      isGranted = permission === RESULTS.GRANTED;
      if (!isGranted) {
        permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        isGranted = permission === RESULTS.GRANTED;
      }
      if (isGranted) {
        let backgroundPermission = await check(
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        );
        isGrantedBackground = backgroundPermission === RESULTS.GRANTED;
        if (!isGrantedBackground) {
          //Alert dialog
          Alert.alert(
            "Require permissions",
            "We need background permission for better ressults.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
                },
              },
              { text: "Cancel" },
            ]
          );
        }
      }
    }

    if (isGrantedBackground || isGranted) {
      Geolocation.watchPosition(
        async (position) => {
          const location = {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          };
          await addUserLocation(location);
        },
        (error) => {
          console.log(error.code, error?.message || "Something went wrong");
        },
        {
          enableHighAccuracy: true,
          fastestInterval: 1000,
          showsBackgroundLocationIndicator: true,
          showLocationDialog: true,
        }
      );
    }
  };

  const {
    data: allUser,
    error: allUserError,
    isError: allUserIsError,
    isLoading: allUserIsLoading,
    isSuccess: allUserIsSuccess,
    refetch,
  } = useGetAllUserQuery(filterData);

  console.log(allUserError)

  useEffect(() => {
    refetch();
  }, [filterData]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   if (allUserIsError) {
  //     Alert.alert("Required", "Do you want to refresh ?", [
  //       {
  //         text: "Refresh",
  //         onPress: () => refetch(),
  //       },
  //     ]);
  //   }
  // }, [allUserIsError]);

  const checkNotificationPermission = useSelector(
    selectCheckNotificationPermission
  );
  const navigation = useNavigation();
  const uid = useSelector(selectUID);

  const handleDeny = () => {
    Alert.alert('Permission Denied', 'You denied the permission.');
  };

  const showPermissionAlert = () => {
    Alert.alert(
      'Permission Required',
      'This app requires your permission to access certain features.',
      [
        { text: 'Deny', onPress: handleDeny, style: 'cancel' },
        {
          text: 'Accept', onPress: () => (async () => {
            await checkLocationPermission();
            console.log({ hello: "Hello" })
          })()
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    // (async () => {
    //   await checkLocationPermission();
    // })();
    showPermissionAlert();
  }, []);

  async function onMessageReceived(data) {
    try {
      if (data?.data?.notifee) {
        const parseDate = JSON.parse(data?.data?.notifee);
        const channel = parseDate?.android?.channelId;
        if (channel) {
          await notifee.createChannel({
            id: channel,
            name: "Message",
            sound: "default",
            importance: AndroidImportance.HIGH,
          });
          notifee.displayNotification(parseDate);
        }
      }
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    messaging().onMessage(async (remoteMessage) => {
      onMessageReceived(remoteMessage);
    });
  }, []);

  useEffect(() => {
    const socket = getSocket();
    socket.on("connect", () => {
      socket.emit(
        "addActiveUser",
        JSON.stringify({
          uid: uid,
          socketID: socket.id,
        })
      );
    });
    socket.on("getMatched", (data) => {
      // Alert.alert('Matched', 'You have matched with someone!', [
      //   {
      //     text: 'view',
      //     onPress: () =>
      //       navigation.navigate(homeRoutes.match.path as never, data as never),
      //   },
      // ]);
      Alert.alert("You have matched with someone!");
    });
  }, []);

  const onSwiped = (index: number) => {
    if (userDetails?.data.length > 0) {
      if (index <= userDetails?.data?.length - 2) {
        setIndex(index + 1);
        // dispatch(
        //   removeSingleUserDetails(userDetails?.data[index]?.userID?._id)
        // );
      } else {
        setCardEmpty(true);
      }
    } else {
      setCardEmpty(true);
    }
  };

  const onSwipedLeft = async (i: number) => {
    const body = {
      user2: userDetails?.data[i]?.userID?._id,
      status: "disLiked",
    };
    await addLike(body);
    toast.show({
      placement: "top",
      render: () => {
        return (
          <Box bg="danger.200" px="2" py="2" rounded="sm" w="full">
            <Text>
              You have disliked {userDetails?.data[i]?.userID?.firstName} !
            </Text>
          </Box>
        );
      },
    });
  };

  const onSwipedRight = async (i: number) => {
    const body = {
      user2: userDetails?.data[i]?.userID?._id,
      status: "liked",
    };
    await addLike(body);
    toast.show({
      placement: "top",
      render: () => {
        return (
          <Box bg="primary.100" px="2" py="2" rounded="sm">
            <Text color="white">
              You have liked {userDetails?.data[i]?.userID?.firstName} !
            </Text>
          </Box>
        );
      },
    });
  };

  const onSwipedTop = async (i: number) => {
    const body = {
      user2: userDetails?.data[i]?.userID?._id,
      status: "superliked",
    };
    await addLike(body);
    toast.show({
      placement: "top",
      render: () => {
        return (
          <Box bg="primary.100" px="2" py="2" rounded="sm">
            <Text color="white">
              You have superliked {userDetails?.data[i]?.userID?.firstName} !
            </Text>
          </Box>
        );
      },
    });
  };

  const handleClose = () => {
    swiperRef.current.swipeLeft();
  };

  const handleHeart = () => {
    swiperRef.current.swipeRight();
  };

  const handleStar = () => {
    swiperRef.current.swipeTop();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <FilterButton routeName={"FilterSearchScreen"} />
          {/* <SettingButtonWithIcon routeName={homeRoutes.setting.path} /> */}
        </>
      ),
    });
  }, []);

  if (allUserIsLoading) {
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

  if (!checkNotificationPermission) {
    navigation.navigate(dashBoardRoutes?.notificationPermission?.path as never);
  }

  return (
    <ScrollView
      scrollEnabled={false}
      refreshControl={
        <RefreshControl
          colors={[colors.primary[100]]}
          progressBackgroundColor="white"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <VStack
        bg={"white"}
        // space="4"
        // justifyContent="space-between"
        // flex={1}
        height={height}
        w={width}
      >
        {isCardEmpty ||
          userDetails?.data?.length === 0 ||
          userDetails?.data?.filter((data) => !data?.userID).length > 0 ? (
          <EmptyCardComponent />
        ) : (
          <>
            <Swiper
              ref={swiperRef}
              cards={userDetails?.data}
              cardIndex={index}
              renderCard={(card: any) => <SwiperCard {...card} />}
              backgroundColor={"transparent"}
              onSwiped={onSwiped}
              onSwipedLeft={onSwipedLeft}
              onSwipedRight={onSwipedRight}
              onSwipedTop={onSwipedTop}
              // cardVerticalMargin={30}
              stackSize={4}
              stackScale={4}
              stackSeparation={-25}
              useViewOverflow={Platform.OS === "ios"}
              animateOverlayLabelsOpacity
              animateCardOpacity
              disableBottomSwipe
              overlayLabels={{
                left: {
                  element: (
                    <SwiperElement iconName="close" iconColor="#FF288F" />
                  ),
                },
                right: {
                  element: (
                    <SwiperElement iconName="heart" iconColor="#AF0DBD" />
                  ),
                },
                top: {
                  element: (
                    <SwiperElement iconName="star" iconColor="#FF288F" />
                  ),
                },
              }}
            />

            <VStack position="absolute" top={height / 1.4} w="full">
              <HStack
                alignItems={"center"}
                // space={10}
                justifyContent="space-evenly"
                h="20px"
                px="20px"
                zIndex={100}
              >
                <CircleButton
                  bgColor="rgba(100, 100, 100, 0.4)"
                  circleSize="47"
                  icon={"close"}
                  iconColor={"#FF288F"}
                  iconSize={15}
                  onPress={handleClose}
                />
                <CircleButton
                  bgColor="rgba(100, 100, 100, 0.4)"
                  circleSize="60"
                  icon={"heart"}
                  iconColor={"#AF0DBD"}
                  iconSize={25}
                  onPress={handleHeart}
                />
                <CircleButton
                  bgColor="rgba(100, 100, 100, 0.4)"
                  circleSize="47"
                  icon={"star"}
                  iconColor={"#FF288F"}
                  iconSize={15}
                  onPress={handleStar}
                />
              </HStack>
            </VStack>

            <CustomLoadingModal modalVisible={loading} />
          </>
        )}
      </VStack>
    </ScrollView>
  );
}
