import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {useEffect} from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {persistor, store} from './redux';
import theme from './src/theme-config/config';
import notifee, {AndroidImportance} from '@notifee/react-native';
import handleNotification from './src/utils/notificationHandler';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLISHED_KEY} from './config';

const log = console.log;

global.log = log;

const linking = {
  prefixes: ['jugol://'],
  config: {
    screens: {
      Call: 'call/:callChannelId',
      CallPermission: 'callPermission/:callChannelId',
      ChatScreen: 'chatScreen/:id/:currentUser',
    },
  },
};

export default function Main() {
  useEffect(() => {
    notifee.onForegroundEvent(handleNotification);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <NavigationContainer linking={linking}>
          <SheetProvider>
            <SafeAreaProvider>
              <NativeBaseProvider theme={theme}>
                <StripeProvider
                  publishableKey={STRIPE_PUBLISHED_KEY}
                  merchantIdentifier="merchant.com.stripe.react.native"
                  threeDSecureParams={{
                    backgroundColor: '#FFF',
                    timeout: 5,
                  }}>
                  <App />
                </StripeProvider>
              </NativeBaseProvider>
            </SafeAreaProvider>
          </SheetProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
