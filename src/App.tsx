// SPDX-License-Identifier: BUSL-1.1

import {Initialization} from '@components/Initialization';
import {Router} from '@navigation/Router';
import {System} from '@screens/System';
import {magic} from '@services/magicLink';
import React from 'react';
import {StatusBar} from 'react-native';
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
          <Router />
          <System />
          <magic.Relayer />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
