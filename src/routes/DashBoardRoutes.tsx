import useAuthRoutes from "@hooks/useAuthRoutes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterSearchScreen from "@screens/home-screens/FilterSearchScreen/FilterSearchScreen";
import CallingScreen from "@screens/message-screens/CallingScreen/CallingScreen";
import ChatScreen from "@screens/message-screens/ChatScreen/ChatScreen";
import ChackCallPremission from "@screens/others/ChackCallPremission";
import BePremiumScreen from "@screens/premium-screens/BePremiumScreen/BePremiumScreen";
import CardPayment from "@screens/premium-screens/CardPayment/CardPayment";
import PaymentMethodScreen from "@screens/premium-screens/PaymentMethodScreen/PaymentMethodScreen";
import PaymentSuccess from "@screens/premium-screens/PaymentSuccess/PaymentSuccess";
import PremiumPackagesScreen from "@screens/premium-screens/PremiumPackagesScreen/PremiumPackagesScreen";
import BackButton from "@ui/BackButton/BackButton";
import React, { useEffect, useState } from "react";
import AuthRoutes from "./AuthRoutes";
import dashBoardScreens from "./dashboard.routes";
import auth from "@react-native-firebase/auth";
import LikeProfileScreen from "@screens/like-screens/LikeProfileScreen/LikeProfileScreen";
import { useCheckUserMutation } from "@store/api/authApi/authApiSlice";

export default function DashBoardRoutes() {
  const screens = Object.values(dashBoardScreens);
  const Stack = createNativeStackNavigator();
  const isAuthenticated = useAuthRoutes();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [checkUser, results] = useCheckUserMutation();
  const [newUser, setNewUser] = useState(null);

  console.log({ newUser, user });

  // Handle user state changes
  async function onAuthStateChanged(authUser) {
    if (authUser) {
      const results = await checkUser(authUser?.uid).unwrap();
      const {
        hasUpdatedGender,
        hasUpdatedAddress,
        hasUpdatedProfile,
        hasUpdatedInterest,
        isNewUser,
      } = results?.data;
      setNewUser(isNewUser || !hasUpdatedGender || !hasUpdatedAddress || !hasUpdatedProfile || !hasUpdatedInterest);
    }
    setUser(authUser);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerShown: false,
        headerLeft: BackButton,
      }}
      initialRouteName={dashBoardScreens.bottomTab.path}
    >
      {(!user || newUser === null ? !newUser : newUser) ? (
        <Stack.Screen component={AuthRoutes} name="authRoutes" />
      ) : (
        <Stack.Group>
          {screens.map((screen) => {
            return (
              <Stack.Screen
                key={screen.path}
                name={screen.path}
                component={screen.component}
                options={screen?.options}
              />
            );
          })}
        </Stack.Group>
      )}

      <Stack.Screen name="Call" component={CallingScreen} />
      <Stack.Screen name="CallPermission" component={ChackCallPremission} />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="BePremium"
        component={BePremiumScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PremiumPackagesScreen"
        component={PremiumPackagesScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PaymentMethodScreen"
        component={PaymentMethodScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="CardPayment"
        component={CardPayment}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="FilterSearchScreen"
        component={FilterSearchScreen}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LikeProfileScreen"
        component={LikeProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
