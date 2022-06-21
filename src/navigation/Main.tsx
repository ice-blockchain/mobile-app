// SPDX-License-Identifier: BUSL-1.1

import {MainTabBar} from '@navigation/components/MainTabBar';
import {HomeIcon} from '@navigation/components/MainTabBar/components/Icons/HomeIcon';
import {NewsIcon} from '@navigation/components/MainTabBar/components/Icons/NewsIcon';
import {ProfileIcon} from '@navigation/components/MainTabBar/components/Icons/ProfileIcon';
import {TeamIcon} from '@navigation/components/MainTabBar/components/Icons/TeamIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Home} from '@screens/Home';
import {News} from '@screens/News';
import {MyBadges} from '@screens/ProfileFlow/MyBadges';
import {MyRoles} from '@screens/ProfileFlow/MyRoles';
import {Profile} from '@screens/ProfileFlow/Profile';
import {Team} from '@screens/Team';
import {WebView} from '@screens/WebView';
import React from 'react';
import {Platform} from 'react-native';

export type MainTabsParamList = {
  HomeTab: undefined;
  TeamTab: undefined;
  NewsTab: undefined;
  ProfileTab: undefined;
};

export type MainStackParamList = {
  Main: undefined;
  WebView: undefined;
  MyRoles: undefined;
  MyBadges: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  MyRoles: undefined;
  MyBadges: undefined;
};

const Tabs = createBottomTabNavigator<MainTabsParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

const tabOptions = {
  headerShown: false,
  lazy: true,
};

const screenOptions = {
  headerShown: false,
};

const modalOptions =
  Platform.OS === 'ios'
    ? TransitionPresets.ModalSlideFromBottomIOS
    : TransitionPresets.ScaleFromCenterAndroid;

const ProfileFlow = () => {
  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="MyRoles" component={MyRoles} />
      <ProfileStack.Screen name="MyBadges" component={MyBadges} />
    </ProfileStack.Navigator>
  );
};

const MainTabs = () => (
  <Tabs.Navigator screenOptions={tabOptions} tabBar={MainTabBar}>
    <Tabs.Screen
      name="HomeTab"
      component={Home}
      options={{tabBarIcon: HomeIcon}}
    />
    <Tabs.Screen
      name="TeamTab"
      component={Team}
      options={{tabBarIcon: TeamIcon}}
    />
    <Tabs.Screen
      name="NewsTab"
      component={News}
      options={{tabBarIcon: NewsIcon}}
    />
    <Tabs.Screen
      name="ProfileTab"
      component={ProfileFlow}
      options={{tabBarIcon: ProfileIcon}}
    />
  </Tabs.Navigator>
);

export function Main() {
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name="Main" component={MainTabs} />
      <MainStack.Screen
        name="WebView"
        component={WebView}
        options={modalOptions}
      />
    </MainStack.Navigator>
  );
}
