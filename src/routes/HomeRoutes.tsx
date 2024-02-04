import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import homeScreens from './home.routes';
import BackButton from '@ui/BackButton/BackButton';

export default function HomeRoutes() {
  const screens = Object.values(homeScreens);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerLeft: BackButton,
      }}
      initialRouteName={homeScreens.discover.path}>
      {screens.map(screen => {
        return (
          <Stack.Screen
            key={screen.path}
            name={screen.path}
            component={screen.component}
            options={screen?.options}
          />
        );
      })}
    </Stack.Navigator>
  );
}
