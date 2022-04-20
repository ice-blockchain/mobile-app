// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from '@navigation/Router';
import System from '@screens/System';
import StoreConfig from './configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// import System from 'src/screens/System';

export default function App(): React.ReactNode {
  return (
    <SafeAreaProvider>
      <Provider store={StoreConfig.store}>
        <PersistGate loading={null} persistor={StoreConfig.persistor}>
          <Router />
          <System />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
