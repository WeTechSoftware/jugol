import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import authScreens from './auth.routes';
import BackButton from '@ui/BackButton/BackButton';

export default function AuthRoutes() {
  const screens = Object.values(authScreens);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerLeft: BackButton,
      }}
      initialRouteName={authScreens.intro.path}>
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
