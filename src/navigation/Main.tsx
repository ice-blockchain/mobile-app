// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import WebView from '@screens/WebView';
import Home from '@screens/Home';
import Team from '@screens/Team';
import News from '@screens/News';
import Profile from '@screens/Profile';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabOptions = {
  headerShown: false,
  lazy: true,
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

export default function Main() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="WebView" component={WebView} />
    </Stack.Navigator>
  );
}
