import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BackButton from '@ui/BackButton/BackButton';
import React from 'react';
import likeScreens from './like.routes';

export default function LikeRoutes() {
  const screens = Object.values(likeScreens);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerLeft: BackButton,
      }}
      initialRouteName={likeScreens.likeScreen.path}>
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
