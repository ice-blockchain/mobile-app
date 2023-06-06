// SPDX-License-Identifier: ice License 1.0

import {AnimatedSplash} from '@navigation/components/AnimatedSplash';
import {Router} from '@navigation/Router';
import {persistor, store} from '@store/configureStore';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

export function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar translucent backgroundColor="transparent" />
          <GestureHandlerRootView style={styles.container}>
            <Router />
          </GestureHandlerRootView>
        </PersistGate>
        <AnimatedSplash />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
