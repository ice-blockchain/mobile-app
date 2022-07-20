// SPDX-License-Identifier: BUSL-1.1

import {BadgeCategory} from '@api/badges/types';
import {MainTabBar} from '@navigation/components/MainTabBar';
import {HomeIcon} from '@navigation/components/MainTabBar/components/Icons/HomeIcon';
import {NewsIcon} from '@navigation/components/MainTabBar/components/Icons/NewsIcon';
import {ProfileIcon} from '@navigation/components/MainTabBar/components/Icons/ProfileIcon';
import {TeamIcon} from '@navigation/components/MainTabBar/components/Icons/TeamIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {Confirm, ConfirmButton} from '@screens/Dialogs/Confirm';
import {Home} from '@screens/Home';
import {News} from '@screens/News';
import {MyBadges} from '@screens/ProfileFlow/MyBadges';
import {MyRoles} from '@screens/ProfileFlow/MyRoles';
import {Profile} from '@screens/ProfileFlow/Profile';
import {ConfirmNewPhone} from '@screens/SettingsFlow/ConfirmNewPhone';
import {ConfirmPhoneCode} from '@screens/SettingsFlow/ConfirmPhoneCode';
import {LanguageSettings} from '@screens/SettingsFlow/LanguageSettings';
import {NotificationSettings} from '@screens/SettingsFlow/NotificationSettings';
import {PersonalInformation} from '@screens/SettingsFlow/PersonalInformation';
import {Settings} from '@screens/SettingsFlow/Settings';
import {Staking} from '@screens/Staking';
import {Team} from '@screens/Team';
import {Tooltip} from '@screens/Tooltip';
import {WebView} from '@screens/WebView';
import React, {ComponentType, RefObject} from 'react';
import {View} from 'react-native';

export type MainTabsParamList = {
  HomeTab: undefined;
  TeamTab: undefined;
  NewsTab: undefined;
  ProfileTab: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  WebView: undefined;
  Confirm: {
    title?: string;
    subtitle?: string;
    buttons?: ConfirmButton[];
  };
  Tooltip: {
    descriptionPosition: 'above' | 'below';
    targetRef: RefObject<View>;
    TargetComponent: ComponentType<unknown>;
    DescriptionComponent: ComponentType<unknown>;
    targetCircleSize?: number;
    descriptionOffset?: number;
  };
  Staking: undefined;
};

export type HomeTabStackParamList = {
  Home: undefined;
  Profile: undefined;
  MyRoles: undefined;
  MyBadges: {category?: BadgeCategory} | undefined;
};

export type TeamTabStackParamList = {
  Team: undefined;
};

export type ProfileTabStackParamList = {
  Profile: undefined;
  MyRoles: undefined;
  MyBadges?: {category?: BadgeCategory};
  Settings: undefined;
  PersonalInformation: undefined;
  ConfirmNewPhone: undefined;
  ConfirmPhoneCode: undefined;
  NotificationSettings: undefined;
  LanguageSettings: undefined;
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

const modalOptions: NativeStackNavigationOptions = {
  presentation: 'transparentModal',
  animation: 'fade',
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
    <ProfileTabStack.Screen
      name="PersonalInformation"
      component={PersonalInformation}
    />
    <ProfileTabStack.Screen
      name="ConfirmNewPhone"
      component={ConfirmNewPhone}
    />
    <ProfileTabStack.Screen
      name="ConfirmPhoneCode"
      component={ConfirmPhoneCode}
    />
    <ProfileTabStack.Screen
      name="NotificationSettings"
      component={NotificationSettings}
    />
    <ProfileTabStack.Screen
      name="LanguageSettings"
      component={LanguageSettings}
    />
  </ProfileTabStack.Navigator>
);

const MainTabs = () => (
  <Tabs.Navigator
    screenOptions={tabOptions}
    tabBar={props => <MainTabBar {...props} />}>
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

export function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen
        name="WebView"
        options={modalOptions}
        component={WebView}
      />
      <MainStack.Screen
        name="Confirm"
        options={modalOptions}
        component={Confirm}
      />
      <MainStack.Screen
        name="Tooltip"
        options={modalOptions}
        component={Tooltip}
      />
      <MainStack.Screen name="Staking" component={Staking} />
    </MainStack.Navigator>
  );
}
