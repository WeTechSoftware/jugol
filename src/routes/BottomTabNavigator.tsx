import colors from "@colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabComponent from "@ui/BottomTabComponent/BottomTabComponent";
import React from "react";
import bottomTabNavigator from "./bottomTab.routes";

export default function BottomTabNavigator() {
  const screens = Object.values(bottomTabNavigator);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShadowVisible: false,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          paddingTop: 0,
          marginTop: 0,
          borderTopWidth: 0.6,
          borderTopColor: colors.gray[100],
        },
        tabBarIcon: (props) => (
          <BottomTabComponent routeName={route.name} focused={props.focused} />
        ),
        tabBarHideOnKeyboard: true,
      })}
      initialRouteName={bottomTabNavigator.home.path}
    >
      {screens.map((screen) => {
        return (
          <Tab.Screen
            key={screen.path}
            name={screen.path}
            component={screen.component}
            options={screen?.options}
          />
        );
      })}
    </Tab.Navigator>
  );
}
