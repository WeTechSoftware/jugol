import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BackButton from '@ui/BackButton/BackButton';
import React from 'react';
import profileScreens from './account.routes';

export default function AccountRoutes() {
  const screens = Object.values(profileScreens);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerLeft: BackButton,
      }}
      initialRouteName={profileScreens.setting.path}>
      {screens?.map(screen => {
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
