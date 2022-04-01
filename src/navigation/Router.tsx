import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import selectors from 'src/store/selectors';
import ref from './ref';
import KYC from './KYC';
import Main from './Main';

function ActiveNavigator() {
  const profile = selectors.profile();

  if (!profile.kyc_finished) {
    return <KYC />;
  }

  return <Main />;
}

export default function Router() {
  return (
    <NavigationContainer ref={ref}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
