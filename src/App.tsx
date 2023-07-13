// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import {AnimatedSplash} from '@navigation/components/AnimatedSplash';
import {Router} from '@navigation/Router';
import {persistor, store} from '@store/configureStore';
import {disableFontScaling} from '@utils/ui';
import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

disableFontScaling();

export function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar translucent backgroundColor="transparent" />
          <GestureHandlerRootView style={commonStyles.flexOne}>
            <Router />
          </GestureHandlerRootView>
        </PersistGate>
        <AnimatedSplash />
      </Provider>
    </SafeAreaProvider>
  );
}
