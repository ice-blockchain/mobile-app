// SPDX-License-Identifier: BUSL-1.1

import {useInitialRouteName} from '@navigation/hooks/useInitialRouteName';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ClaimNickname} from '@screens/AuthFlow/ClaimNickname';
import {SignIn} from '@screens/AuthFlow/SignIn';
import {Welcome} from '@screens/AuthFlow/Welcome';
import {WebView} from '@screens/WebView';
import React from 'react';

export type AuthStackParamList = {
  Signup: undefined;
  WebView: undefined;
};

export type SignUpStackParamList = {
  Intro: undefined;
  ClaimNickname: undefined;
  Invite: undefined;
  Welcome: undefined;
  SignIn: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const SignUpStack = createNativeStackNavigator<SignUpStackParamList>();

const screenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'white',
  },
};

const modalOptions = {
  presentation: 'fullScreenModal',
} as const;

function Signup() {
  const initialRouteName = useInitialRouteName();
  return (
    <SignUpStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}>
      <SignUpStack.Screen name="ClaimNickname" component={ClaimNickname} />
      <SignUpStack.Screen name="Welcome" component={Welcome} />
      <SignUpStack.Screen name="SignIn" component={SignIn} />
    </SignUpStack.Navigator>
  );
}

export function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen
        options={modalOptions}
        name="WebView"
        component={WebView}
      />
    </AuthStack.Navigator>
  );
}
