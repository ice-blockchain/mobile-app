// SPDX-License-Identifier: BUSL-1.1

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn} from '@screens/UserRegistrationFlow/SignIn';
import {UserRegistration} from '@screens/UserRegistrationFlow/UserRegistration';
import {Welcome} from '@screens/UserRegistrationFlow/Welcome';
import {WebView} from '@screens/WebView';
import {
  isWelcomeSeenSelector,
  magicUserSelector,
  profileSelector,
} from '@store/modules/Auth/selectors';
import React from 'react';
import {useSelector} from 'react-redux';

export type AuthStackParamList = {
  Signup: undefined;
  WebView: undefined;
};

export type SignUpStackParamList = {
  Intro: undefined;
  UserRegistration: undefined;
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
  const magicUser = useSelector(magicUserSelector);
  const profile = useSelector(profileSelector);
  const isWelcomeSeen = useSelector(isWelcomeSeenSelector);

  const initialAuthRoute = () => {
    if (!isWelcomeSeen && magicUser) {
      return 'Welcome';
    } else if (magicUser && (!profile || !profile.username)) {
      return 'UserRegistration';
    }
    return 'SignIn';
  };

  return (
    <SignUpStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialAuthRoute()}>
      <SignUpStack.Screen
        name="UserRegistration"
        component={UserRegistration}
      />
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
