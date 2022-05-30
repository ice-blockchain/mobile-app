// SPDX-License-Identifier: BUSL-1.1

import {Router} from '@navigation/Router';
import {Initialization} from '@screens/AuthFlow/Initialization';
import {System} from '@screens/System';
import {magic} from '@services/magicLink';
import React from 'react';
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
          <Router />
          <System />
          <magic.Relayer />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
