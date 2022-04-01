import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from 'src/navigation/Router';
import System from 'src/screens/System';
// import StoreProvider from 'src/store/Provider';

export default function App(): React.ReactNode {
  return (
    <SafeAreaProvider>
      {/* <StoreProvider> */}
      <Router />
      <System />
      {/* </StoreProvider> */}
    </SafeAreaProvider>
  );
}
