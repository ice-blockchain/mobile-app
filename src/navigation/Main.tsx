// SPDX-License-Identifier: BUSL-1.1

import {BadgeCategory} from '@api/badges/types';
import {MainTabBar} from '@navigation/components/MainTabBar';
import {HomeIcon} from '@navigation/components/MainTabBar/components/Icons/HomeIcon';
import {NewsIcon} from '@navigation/components/MainTabBar/components/Icons/NewsIcon';
import {ProfileIcon} from '@navigation/components/MainTabBar/components/Icons/ProfileIcon';
import {TeamIcon} from '@navigation/components/MainTabBar/components/Icons/TeamIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '@screens/Home';
import {News} from '@screens/News';
import {MyBadges} from '@screens/ProfileFlow/MyBadges';
import {MyRoles} from '@screens/ProfileFlow/MyRoles';
import {Profile} from '@screens/ProfileFlow/Profile';
import {Settings} from '@screens/SettingsFlow/Settings';
import {Team} from '@screens/Team';
import {WebView} from '@screens/WebView';
import React from 'react';

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

export type HomeTabStackParamList = {
  Home: undefined;
  Profile: undefined;
  MyRoles: undefined;
  MyBadges: {category?: BadgeCategory} | undefined;
};

export type TeamTabStackParamList = {
  Team: undefined;
  Profile: undefined;
  MyRoles: undefined;
  MyBadges: undefined;
};

export type ProfileTabStackParamList = {
  Profile: undefined;
  MyRoles: undefined;
  MyBadges?: {category?: BadgeCategory};
  Settings: undefined;
};

const Tabs = createBottomTabNavigator<MainTabsParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const HomeTabStack = createNativeStackNavigator<HomeTabStackParamList>();
const TeamTabStack = createNativeStackNavigator<TeamTabStackParamList>();
const ProfileTabStack = createNativeStackNavigator<ProfileTabStackParamList>();

const tabOptions = {
  headerShown: false,
  lazy: true,
};

const screenOptions = {
  headerShown: false,
};

const modalOptions = {
  presentation: 'fullScreenModal',
} as const;

/**
 * Needs to be on MyBadges screen to enable swipe to go back over PagerView
 * Note: patches/react-native-screens.patch is also a part of the fix
 */
const myBadgesOptions = {fullScreenGestureEnabled: true};

const HomeTabStackNavigator = () => (
  <HomeTabStack.Navigator screenOptions={screenOptions}>
    <HomeTabStack.Screen name="Home" component={Home} />
    <HomeTabStack.Screen name="Profile" component={Profile} />
    <HomeTabStack.Screen name="MyRoles" component={MyRoles} />
    <HomeTabStack.Screen
      name="MyBadges"
      component={MyBadges}
      options={myBadgesOptions}
    />
  </HomeTabStack.Navigator>
);

const TeamTabStackNavigator = () => (
  <TeamTabStack.Navigator screenOptions={screenOptions}>
    <TeamTabStack.Screen name="Team" component={Team} />
    <TeamTabStack.Screen name="Profile" component={Profile} />
    <TeamTabStack.Screen name="MyRoles" component={MyRoles} />
    <TeamTabStack.Screen
      name="MyBadges"
      component={MyBadges}
      options={myBadgesOptions}
    />
  </TeamTabStack.Navigator>
);

const ProfileTabStackNavigator = () => (
  <ProfileTabStack.Navigator screenOptions={screenOptions}>
    <ProfileTabStack.Screen name="Profile" component={Profile} />
    <ProfileTabStack.Screen name="MyRoles" component={MyRoles} />
    <ProfileTabStack.Screen
      name="MyBadges"
      component={MyBadges}
      options={myBadgesOptions}
    />
    <ProfileTabStack.Screen name="Settings" component={Settings} />
  </ProfileTabStack.Navigator>
);

const MainTabs = () => (
  <Tabs.Navigator screenOptions={tabOptions} tabBar={MainTabBar}>
    <Tabs.Screen
      name="HomeTab"
      component={HomeTabStackNavigator}
      options={{tabBarIcon: HomeIcon}}
    />
    <Tabs.Screen
      name="TeamTab"
      component={TeamTabStackNavigator}
      options={{tabBarIcon: TeamIcon}}
    />
    <Tabs.Screen
      name="NewsTab"
      component={News}
      options={{tabBarIcon: NewsIcon}}
    />
    <Tabs.Screen
      name="ProfileTab"
      component={ProfileTabStackNavigator}
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
        options={modalOptions}
        component={WebView}
      />
    </MainStack.Navigator>
  );
}
