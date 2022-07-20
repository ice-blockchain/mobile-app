// SPDX-License-Identifier: BUSL-1.1

import {Initialization} from '@components/Initialization';
import {Router} from '@navigation/Router';
import {magic} from '@services/magicLink';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {configuredStore} from './store/configureStore';

export function App(): React.ReactNode {
  return (
    <SafeAreaProvider>
      <Provider store={configuredStore.store}>
        <PersistGate
          loading={<Initialization />}
          persistor={configuredStore.persistor}>
          <StatusBar translucent backgroundColor="transparent" />
          <GestureHandlerRootView style={styles.container}>
            <Router />
          </GestureHandlerRootView>
          <magic.Relayer />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
