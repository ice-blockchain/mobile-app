// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from '@navigation/Router';
import System from '@screens/System';
import StoreConfig from './store/configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import magic from '@services/magicLink';
import Initialization from '@screens/AuthFlow/Initialization';

export default function App(): React.ReactNode {
  return (
    <SafeAreaProvider>
      <Provider store={StoreConfig.store}>
        <PersistGate
          loading={<Initialization />}
          persistor={StoreConfig.persistor}>
          <Router />
          <System />
          <magic.Relayer />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
