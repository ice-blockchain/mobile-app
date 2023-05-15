// SPDX-License-Identifier: ice License 1.0

import {BadgeType} from '@api/achievements/types';
import {NotificationDeliveryChannel} from '@api/devices/types';
import {Country} from '@constants/countries';
import {commonStyles} from '@constants/styles';
import {
  CHAT_TAB_BAR_PADDING,
  ChatTabBar,
} from '@navigation/components/ChatTabBar';
import {ChatTabBarIndicator} from '@navigation/components/ChatTabBarIndicator';
import {
  ExploreTabChatTabBarLabel,
  MessageTabChatTabBarLabel,
} from '@navigation/components/ChatTabBarLabel';
import {MainTabBar} from '@navigation/components/MainTabBar';
import {ChatIcon} from '@navigation/components/MainTabBar/components/Icons/ChatIcon';
import {HomeIcon} from '@navigation/components/MainTabBar/components/Icons/HomeIcon';
import {ProfileIcon} from '@navigation/components/MainTabBar/components/Icons/ProfileIcon';
import {TeamIcon} from '@navigation/components/MainTabBar/components/Icons/TeamIcon';
import {StatusNotice} from '@navigation/components/StatusNotice';
import {modalOptions, screenOptions, tabOptions} from '@navigation/options';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Explore} from '@screens/ChatFlow/Explore';
import {Messages} from '@screens/ChatFlow/Messages';
import {NewChatSelector} from '@screens/ChatFlow/NewChatSelector';
import {BalanceHistory} from '@screens/HomeFlow/BalanceHistory';
import {Home} from '@screens/HomeFlow/Home';
import {
  ActiveOverviewCard,
  ActivePagerCard,
  HomeTabScrollPosition,
} from '@screens/HomeFlow/Home/types';
import {Stats} from '@screens/HomeFlow/Stats';
import {TopCountries} from '@screens/HomeFlow/TopCountries';
import {TopMiners} from '@screens/HomeFlow/TopMiners';
import {UserGrowthGraph} from '@screens/HomeFlow/UserGrowthGraph';
import {ImageView} from '@screens/ImageView';
import {InviteFriend} from '@screens/InviteFlow/InviteFriend';
import {InviteShare} from '@screens/InviteFlow/InviteShare';
import {QRCodeShare} from '@screens/InviteFlow/QRCodeShare';
import {ActionSheet} from '@screens/Modals/ActionSheet';
import {ContextualMenu} from '@screens/Modals/ContextualMenu';
import {
  ContextualMenuButton,
  Coordinates,
} from '@screens/Modals/ContextualMenu/types';
import {CountrySelect} from '@screens/Modals/CountrySelect';
import {DateSelect} from '@screens/Modals/DateSelector';
import {JoinTelegramPopUp} from '@screens/Modals/JoinTelegramPopUp';
import {PopUp, PopUpProps} from '@screens/Modals/PopUp';
import {ProfilePrivacyEditStep1} from '@screens/Modals/ProfilePrivacyEdit/step1';
import {ProfilePrivacyEditStep2} from '@screens/Modals/ProfilePrivacyEdit/step2';
import {ProfilePrivacyEditStep3} from '@screens/Modals/ProfilePrivacyEdit/step3';
import {Tooltip} from '@screens/Modals/Tooltip';
import {News} from '@screens/News';
import {Notifications} from '@screens/Notifications';
import {Badges} from '@screens/ProfileFlow/Badges';
import {Profile} from '@screens/ProfileFlow/Profile';
import {Roles} from '@screens/ProfileFlow/Roles';
import {ConfirmEmail} from '@screens/SettingsFlow/ConfirmEmail';
import {ConfirmPhoneNumber} from '@screens/SettingsFlow/ConfirmPhoneNumber';
import {LanguageSettings} from '@screens/SettingsFlow/LanguageSettings';
import {ModifyEmail} from '@screens/SettingsFlow/ModifyEmail';
import {ModifyPhoneNumber} from '@screens/SettingsFlow/ModifyPhoneNumber';
import {NotificationSettings} from '@screens/SettingsFlow/NotificationSettings';
import {PersonalInformation} from '@screens/SettingsFlow/PersonalInformation';
import {Settings} from '@screens/SettingsFlow/Settings';
import {Staking} from '@screens/Staking';
import {Team} from '@screens/Team';
import {Walkthrough} from '@screens/Walkthrough';
import {ActiveTabActions, Tab} from '@store/modules/ActiveTab/actions';
import {useSubscribeToPushNotifications} from '@store/modules/PushNotifications/hooks/useSubscribeToPushNotifications';
import {StatsPeriod} from '@store/modules/Stats/types';
import {WalkthroughStep} from '@store/modules/Walkthrough/types';
import React, {ComponentType, RefObject} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import Animated from 'react-native-reanimated';
import {SvgProps} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units/index';

export type MainTabsParamList = {
  HomeTab: NavigatorScreenParams<HomeTabStackParamList> | undefined;
  TeamTab: NavigatorScreenParams<TeamTabStackParamList> | undefined;
  ChatTab: NavigatorScreenParams<ChatTabsParamList> | undefined;
  ProfileTab: NavigatorScreenParams<ProfileTabStackParamList> | undefined;
};

export type ChatTabsParamList = {
  MessagesTab: NavigatorScreenParams<MessagesTabStackParamList> | undefined;
  ExploreTab: NavigatorScreenParams<ExploreTabStackParamList> | undefined;
};

export type MessagesTabStackParamList = {
  Messages: undefined;
};

export type ExploreTabStackParamList = {
  Explore: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  PopUp: PopUpProps;
  News: undefined;
  JoinTelegramPopUp: undefined;
  Tooltip: {
    position: 'above' | 'below';
    targetRef: RefObject<View>;
    TargetComponent: ComponentType<{
      onPress?(): void;
    }>;
    DescriptionComponent: ComponentType<unknown>;
    targetCircleSize?: number;
    descriptionOffset?: number;
  };
  Staking: undefined;
  ImageView: {
    imageRef: RefObject<Image | Animated.Image>;
    uri: string;
    size: number;
    borderRadius?: number;
  };
  ActionSheet: {
    title: string;
    buttons: {
      icon: (props: SvgProps) => JSX.Element;
      label: string;
      onPress: () => void;
    }[];
  };
  DateSelect: {
    onSelect: (range: {start: string | null; end: string | null}) => void;
  };
  InviteFriend: {contact: Contact};
  InviteShare: undefined;
  QRCodeShare: undefined;
  ContextualMenu: {
    coords: Coordinates;
    buttons: ContextualMenuButton[];
    onClose?: () => void;
  };
  Notifications: undefined;
  CountrySelect: {
    onSelect: (country: Country) => void;
  };
  UserProfile: {userId: string} | undefined;
  Roles: {userId?: string} | undefined;
  Badges: {category?: BadgeType; userId?: string};
  NewChatSelector: undefined;
  Walkthrough:
    | {step: WalkthroughStep; total: number; index: number}
    | undefined;
  ProfilePrivacyEditStep1: undefined;
  ProfilePrivacyEditStep2: undefined;
  ProfilePrivacyEditStep3: undefined;
};

export type HomeTabStackParamList = {
  Home:
    | {
        activePagerCard?: ActivePagerCard;
        activeOverviewCard?: ActiveOverviewCard;
        scrollTo?: HomeTabScrollPosition;
      }
    | undefined;
  Stats: undefined;
  TopMiners: undefined;
  TopCountries: undefined;
  UserGrowthGraph: {
    category: 'active' | 'total';
    statsPeriod: StatsPeriod;
  };
  BalanceHistory: undefined;
};

export type TeamTabStackParamList = {
  Team: {snapPoint?: number} | undefined;
};

export type ProfileTabStackParamList = {
  MyProfile: undefined;
  Roles: {userId?: string} | undefined;
  Badges: {category?: BadgeType; userId?: string};
  Settings: undefined;
  PersonalInformation: undefined;
  ModifyPhoneNumber: undefined;
  ConfirmPhoneNumber: undefined;
  NotificationSettings: {
    notificationDeliveryChannel: NotificationDeliveryChannel;
  };
  LanguageSettings: undefined;
  ModifyEmail: undefined;
  ConfirmEmail: undefined;
};

export type MainNavigationParams = MainTabsParamList &
  MainStackParamList &
  ProfileTabStackParamList &
  TeamTabStackParamList &
  ChatTabsParamList &
  HomeTabStackParamList;

const Tabs = createBottomTabNavigator<MainTabsParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const HomeTabStack = createNativeStackNavigator<HomeTabStackParamList>();
const TeamTabStack = createNativeStackNavigator<TeamTabStackParamList>();
const ProfileTabStack = createNativeStackNavigator<ProfileTabStackParamList>();

const ChatTopTabs = createMaterialTopTabNavigator<ChatTabsParamList>();
const MessagesTabStack =
  createNativeStackNavigator<MessagesTabStackParamList>();
const ExploreTabStack = createNativeStackNavigator<ExploreTabStackParamList>();

/**
 * Needs to be on Badges screen to enable swipe to go back over PagerView
 * Note: patches/react-native-screens.patch is also a part of the fix
 */
const badgesOptions = {fullScreenGestureEnabled: true};

const HomeTabStackNavigator = () => (
  <HomeTabStack.Navigator screenOptions={screenOptions}>
    <HomeTabStack.Screen name="Home" component={Home} />
    <HomeTabStack.Screen name="Stats" component={Stats} />
    <HomeTabStack.Screen name="TopMiners" component={TopMiners} />
    <HomeTabStack.Screen name="TopCountries" component={TopCountries} />
    <HomeTabStack.Screen name="UserGrowthGraph" component={UserGrowthGraph} />
    <HomeTabStack.Screen name="BalanceHistory" component={BalanceHistory} />
  </HomeTabStack.Navigator>
);

const ProfileTabStackNavigator = () => (
  <ProfileTabStack.Navigator
    screenOptions={screenOptions}
    initialRouteName={'MyProfile'}>
    <ProfileTabStack.Screen name="MyProfile" component={Profile} />
    <ProfileTabStack.Screen name="Roles" component={Roles} />
    <ProfileTabStack.Screen
      name="Badges"
      component={Badges}
      options={badgesOptions}
    />
    <ProfileTabStack.Screen name="Settings" component={Settings} />
    <ProfileTabStack.Screen
      name="PersonalInformation"
      component={PersonalInformation}
    />
    <ProfileTabStack.Screen
      name="ModifyPhoneNumber"
      component={ModifyPhoneNumber}
    />
    <ProfileTabStack.Screen
      name="ConfirmPhoneNumber"
      component={ConfirmPhoneNumber}
    />
    <ProfileTabStack.Screen
      name="NotificationSettings"
      component={NotificationSettings}
    />
    <ProfileTabStack.Screen
      name="LanguageSettings"
      component={LanguageSettings}
    />
    <ProfileTabStack.Screen name="ModifyEmail" component={ModifyEmail} />
    <ProfileTabStack.Screen name="ConfirmEmail" component={ConfirmEmail} />
  </ProfileTabStack.Navigator>
);

const TeamTabStackNavigator = () => {
  return (
    <TeamTabStack.Navigator screenOptions={screenOptions}>
      <TeamTabStack.Screen name="Team" component={Team} />
    </TeamTabStack.Navigator>
  );
};

const MessagesTabStackNavigator = () => (
  <MessagesTabStack.Navigator screenOptions={screenOptions}>
    <MessagesTabStack.Screen name="Messages" component={Messages} />
  </MessagesTabStack.Navigator>
);

const ExploreTabStackNavigator = () => (
  <ExploreTabStack.Navigator screenOptions={screenOptions}>
    <ExploreTabStack.Screen name="Explore" component={Explore} />
  </ExploreTabStack.Navigator>
);

const ChatTabBarComponent = (props: MaterialTopTabBarProps) => (
  <ChatTabBar {...props} />
);

const ChatTabTabNavigator = () => {
  return (
    <ChatTopTabs.Navigator
      screenOptions={{
        ...tabOptions,
        tabBarBounces: true,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 'auto',
          padding: CHAT_TAB_BAR_PADDING,
        },
        tabBarIndicator: ChatTabBarIndicator,
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        },
      }}
      tabBar={ChatTabBarComponent}>
      <ChatTopTabs.Screen
        name="MessagesTab"
        component={MessagesTabStackNavigator}
        options={{
          tabBarLabel: MessageTabChatTabBarLabel,
        }}
      />
      <ChatTopTabs.Screen
        name="ExploreTab"
        component={ExploreTabStackNavigator}
        options={{
          tabBarLabel: ExploreTabChatTabBarLabel,
        }}
      />
    </ChatTopTabs.Navigator>
  );
};

const MainTabBarComponent = (props: BottomTabBarProps) => (
  <MainTabBar {...props} />
);

const MainTabs = () => {
  useSubscribeToPushNotifications();

  const dispatch = useDispatch();
  const getListeners = (tab: Tab) => {
    return () => ({
      tabPress: () =>
        dispatch(ActiveTabActions.SET_ACTIVE_TAB.STATE.create(tab)),
    });
  };

  return (
    <View style={commonStyles.flexOne}>
      <StatusNotice />
      <Tabs.Navigator screenOptions={tabOptions} tabBar={MainTabBarComponent}>
        <Tabs.Screen
          name="HomeTab"
          component={HomeTabStackNavigator}
          options={{
            tabBarIcon: HomeIcon,
            tabBarIconStyle: iconStyles.homeIconStyle,
          }}
          listeners={getListeners('home')}
        />
        <Tabs.Screen
          name="TeamTab"
          component={TeamTabStackNavigator}
          options={{
            tabBarIcon: TeamIcon,
            tabBarIconStyle: iconStyles.teamIconStyle,
          }}
          listeners={getListeners('team')}
        />
        <Tabs.Screen
          name="ChatTab"
          component={ChatTabTabNavigator}
          options={{
            tabBarIcon: ChatIcon,
            tabBarIconStyle: iconStyles.chatIconStyle,
          }}
          listeners={getListeners('chat')}
        />
        <Tabs.Screen
          name="ProfileTab"
          component={ProfileTabStackNavigator}
          options={{
            tabBarIcon: ProfileIcon,
            tabBarIconStyle: iconStyles.profileIconStyle,
          }}
          listeners={getListeners('profile')}
        />
      </Tabs.Navigator>
    </View>
  );
};

export function MainNavigator() {
  // TODO: Hide until notifications functionality is ready
  // Warning! Calling this hook with no internet leads to the app hanging (setTimeout, button handles, requests don't work)
  // So:
  //  1. The problem should be investigated
  //  2. Should it be called only for authenticated users?
  //    If so, then it should be called here instead of Router.tsx or even better, via sagas
  //    + calling in Router.tsx leads to splash screen hanging if user doesn't have internet connection during the app opening
  // useGetstreamListener();
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="PopUp" options={modalOptions} component={PopUp} />
      <MainStack.Screen name="News" component={News} />
      <MainStack.Screen
        name="Tooltip"
        options={modalOptions}
        component={Tooltip}
      />
      <MainStack.Screen
        name="ImageView"
        options={modalOptions}
        component={ImageView}
      />
      <MainStack.Screen
        name="ActionSheet"
        options={modalOptions}
        component={ActionSheet}
      />
      <MainStack.Screen
        name="DateSelect"
        options={modalOptions}
        component={DateSelect}
      />
      <MainStack.Screen name="Staking" component={Staking} />
      <MainStack.Screen
        name="InviteFriend"
        component={InviteFriend}
        options={modalOptions}
      />
      <MainStack.Screen name="InviteShare" component={InviteShare} />
      <MainStack.Screen name="QRCodeShare" component={QRCodeShare} />
      <MainStack.Screen
        name="ContextualMenu"
        component={ContextualMenu}
        options={modalOptions}
      />
      <MainStack.Screen name="Notifications" component={Notifications} />
      <MainStack.Screen
        name="CountrySelect"
        component={CountrySelect}
        options={{
          presentation: 'modal',
        }}
      />
      <MainStack.Screen name="UserProfile" component={Profile} />
      <MainStack.Screen name="Roles" component={Roles} />
      <MainStack.Screen
        name="Badges"
        component={Badges}
        options={badgesOptions}
      />
      <MainStack.Screen
        name="Walkthrough"
        component={Walkthrough}
        options={modalOptions}
      />
      <MainStack.Screen
        name="NewChatSelector"
        component={NewChatSelector}
        options={modalOptions}
      />
      <MainStack.Screen
        name="ProfilePrivacyEditStep1"
        component={ProfilePrivacyEditStep1}
        options={modalOptions}
      />
      <MainStack.Screen
        name="ProfilePrivacyEditStep2"
        component={ProfilePrivacyEditStep2}
        options={modalOptions}
      />
      <MainStack.Screen
        name="ProfilePrivacyEditStep3"
        component={ProfilePrivacyEditStep3}
        options={modalOptions}
      />
      <MainStack.Screen
        name="JoinTelegramPopUp"
        options={modalOptions}
        component={JoinTelegramPopUp}
      />
    </MainStack.Navigator>
  );
}

export const iconStyles = StyleSheet.create({
  homeIconStyle: {marginLeft: rem(8)},
  teamIconStyle: {marginLeft: rem(26)},
  chatIconStyle: {marginRight: rem(26)},
  profileIconStyle: {
    marginRight: rem(8),
  },
});
