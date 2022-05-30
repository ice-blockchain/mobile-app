// SPDX-License-Identifier: BUSL-1.1

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Home} from '@screens/Home';
import {News} from '@screens/News';
import {Profile} from '@screens/Profile';
import {Settings} from '@screens/Settings';
import {Team} from '@screens/Team';
import {WebView} from '@screens/WebView';
import React from 'react';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabOptions = {
  headerShown: false,
  lazy: true,
};

export type MainStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

const HomeTab = () => (
  <Tabs.Navigator
    tabBar={() => null}
    screenOptions={tabOptions}
    detachInactiveScreens={false}>
    <Tabs.Screen name="Home" component={Home} />
  </Tabs.Navigator>
);

const TeamTab = () => (
  <Tabs.Navigator
    tabBar={() => null}
    screenOptions={tabOptions}
    detachInactiveScreens={false}>
    <Tabs.Screen name="Team" component={Team} />
  </Tabs.Navigator>
);

const NewsTab = () => (
  <Tabs.Navigator
    tabBar={() => null}
    screenOptions={tabOptions}
    detachInactiveScreens={false}>
    <Tabs.Screen name="News" component={News} />
  </Tabs.Navigator>
);

const ProfileTab = () => (
  <Tabs.Navigator
    tabBar={() => null}
    screenOptions={tabOptions}
    detachInactiveScreens={false}>
    <Tabs.Screen name="Profile" component={Profile} />
    <Tabs.Screen name="Settings" component={Settings} />
  </Tabs.Navigator>
);

const MainNavigator = () => (
  <Tabs.Navigator
    // tabBar={params => <MainTabBar {...params} />}
    screenOptions={tabOptions}
    detachInactiveScreens={false}>
    <Tabs.Screen name="HomeTab" component={HomeTab} />
    <Tabs.Screen name="TeamTab" component={TeamTab} />
    <Tabs.Screen name="NewsTab" component={NewsTab} />
    <Tabs.Screen name="ProfileTab" component={ProfileTab} />
  </Tabs.Navigator>
);

const screenOptions = {
  headerShown: false,
  ...TransitionPresets.ModalSlideFromBottomIOS,
};

export function Main() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="WebView" component={WebView} />
    </Stack.Navigator>
  );
}
