// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import CheckEmail from '@screens/AuthFlow/CheckEmail';
import ClaimNickname from '@screens/AuthFlow/ClaimNickname';
import Invite from '@screens/AuthFlow/Invite';
import Welcome from '@screens/AuthFlow/Welcome';
import SignIn from '@screens/AuthFlow/SignIn';
import AuthNavigationHelper from '@utils/AuthNavigationHelper';
import WebView from '@screens/WebView';
import Intro from '@screens/AuthFlow/Intro';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'white',
  },
  ...TransitionPresets.SlideFromRightIOS,
};

function Signup() {
  const initial = AuthNavigationHelper();
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={initial}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="CheckEmail" component={CheckEmail} />
      <Stack.Screen name="ClaimNickname" component={ClaimNickname} />
      <Stack.Screen name="Invite" component={Invite} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="WebView" component={WebView} />
    </Stack.Navigator>
  );
}
