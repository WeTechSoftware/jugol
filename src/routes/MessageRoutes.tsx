import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import messageScreens from './message.routes';
import BackButton from '@ui/BackButton/BackButton';

export default function MessageRoutes() {
  const screens = Object.values(messageScreens);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerLeft: BackButton,
      }}
      initialRouteName={messageScreens.messagesScreen.path}>
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
