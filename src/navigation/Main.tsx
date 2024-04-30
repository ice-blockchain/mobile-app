// SPDX-License-Identifier: ice License 1.0

import {BadgeType} from '@api/achievements/types';
import {NotificationDeliveryChannel} from '@api/notifications/types';
import {FaceAuthKycNumber, SocialKycStepNumber} from '@api/tokenomics/types';
import {Country} from '@constants/countries';
import {isLightDesign} from '@constants/featureFlags';
import {commonStyles} from '@constants/styles';
import {ViewMeasurementsResult} from '@ice/react-native';
import {MainTabBar} from '@navigation/components/MainTabBar';
import {HomeIcon} from '@navigation/components/MainTabBar/components/Icons/HomeIcon';
import {NewsIcon} from '@navigation/components/MainTabBar/components/Icons/NewsIcon';
import {ProfileIcon} from '@navigation/components/MainTabBar/components/Icons/ProfileIcon';
import {StatsTabIcon} from '@navigation/components/MainTabBar/components/Icons/StatsTabIcon';
import {TeamIcon} from '@navigation/components/MainTabBar/components/Icons/TeamIcon';
import {StatusNotice} from '@navigation/components/StatusNotice';
import {modalOptions, screenOptions, tabOptions} from '@navigation/options';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreativeIceLibrary} from '@screens/CreativeIceLibrary';
import {FaceRecognition} from '@screens/FaceRecognitionFlow';
import {BalanceHistory} from '@screens/HomeFlow/BalanceHistory';
import {BscAddress} from '@screens/HomeFlow/BscAddress';
import {Home} from '@screens/HomeFlow/Home';
import {
  ActiveOverviewCard,
  ActivePagerCard,
  HomeTabScrollPosition,
} from '@screens/HomeFlow/Home/types';
import {InAppNotifications} from '@screens/HomeFlow/InAppNotifications';
import {Stats} from '@screens/HomeFlow/Stats';
import {TopMiners} from '@screens/HomeFlow/TopMiners';
import {UserGrowthGraph} from '@screens/HomeFlow/UserGrowthGraph';
import {ImageView} from '@screens/ImageView';
import {InviteFriend} from '@screens/InviteFlow/InviteFriend';
import {InviteShare} from '@screens/InviteFlow/InviteShare';
import {QRCodeShare} from '@screens/InviteFlow/QRCodeShare';
import {ActionSheet} from '@screens/Modals/ActionSheet';
import {BalanceHistoryTooltip} from '@screens/Modals/BalanceHistoryTooltip';
import {ContextualMenu} from '@screens/Modals/ContextualMenu';
import {ContextualMenuButton} from '@screens/Modals/ContextualMenu/types';
import {CountrySelect} from '@screens/Modals/CountrySelect';
import {DateSelect} from '@screens/Modals/DateSelector';
import {JoinTelegramPopUp} from '@screens/Modals/JoinTelegramPopUp';
import {PingReferralsPopUp} from '@screens/Modals/PingReferralsPopUp';
import {PopUp, PopUpProps} from '@screens/Modals/PopUp';
import {ProfilePrivacyEditStep1} from '@screens/Modals/ProfilePrivacyEdit/step1';
import {ProfilePrivacyEditStep2} from '@screens/Modals/ProfilePrivacyEdit/step2';
import {ProfilePrivacyEditStep3} from '@screens/Modals/ProfilePrivacyEdit/step3';
import {ReferralCountInfo} from '@screens/Modals/ReferralCountInfo';
import {RepostExample} from '@screens/Modals/RepostExample';
import {Tooltip} from '@screens/Modals/Tooltip';
import {Coordinates} from '@screens/Modals/types';
import {VerifiedTooltipPopUp} from '@screens/Modals/VerifiedTooltipPopUp';
import {News} from '@screens/News';
import {Badges} from '@screens/ProfileFlow/Badges';
import {Profile} from '@screens/ProfileFlow/Profile';
import {ProfileActionType} from '@screens/ProfileFlow/Profile/types';
import {Roles} from '@screens/ProfileFlow/Roles';
import {Quiz} from '@screens/QuizFlow/Quiz';
import {QuizFailure} from '@screens/QuizFlow/QuizFailure';
import {QuizIntro} from '@screens/QuizFlow/QuizIntro';
import {QuizSuccess} from '@screens/QuizFlow/QuizSuccess';
import {ConfirmEmail} from '@screens/SettingsFlow/ConfirmEmail';
import {ConfirmPhoneNumber} from '@screens/SettingsFlow/ConfirmPhoneNumber';
import {LanguageSettings} from '@screens/SettingsFlow/LanguageSettings';
import {ModifyEmail} from '@screens/SettingsFlow/ModifyEmail';
import {ModifyPhoneNumber} from '@screens/SettingsFlow/ModifyPhoneNumber';
import {NotificationSettings} from '@screens/SettingsFlow/NotificationSettings';
import {PersonalInformation} from '@screens/SettingsFlow/PersonalInformation';
import {Settings} from '@screens/SettingsFlow/Settings';
import {SocialKycFlow} from '@screens/SocialKycFlow';
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
  NewsTab: NavigatorScreenParams<NewsTabStackParamList> | undefined;
  ProfileTab: NavigatorScreenParams<ProfileTabStackParamList> | undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  PopUp: PopUpProps;
  JoinTelegramPopUp: undefined;
  PingReferralsPopUp: {userId: string};
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
  FaceRecognition: {
    kycSteps: FaceAuthKycNumber[];
    kycStepBlocked?: FaceAuthKycNumber;
    isPhoneMigrationFlow?: boolean;
  };
  SocialKycFlow: {kycStep: SocialKycStepNumber};
  Staking: undefined;
  CreativeIceLibrary: undefined;
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
  RepostExample: {kycStep: SocialKycStepNumber};
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
  BalanceHistoryTooltip: {
    coords: Coordinates;
  };
  ReferralCountInfo: {
    hostViewParams: ViewMeasurementsResult;
    userId: string;
  };
  InAppNotifications: undefined;
  CountrySelect: {
    onSelect: (country: Country) => void;
  };
  UserProfile: {userId: string; actionType?: ProfileActionType} | undefined;
  Roles: {userId?: string} | undefined;
  Badges: {category?: BadgeType; userId?: string};
  Walkthrough:
    | {step: WalkthroughStep; total: number; index: number}
    | undefined;
  ProfilePrivacyEditStep1: undefined;
  ProfilePrivacyEditStep2: undefined;
  ProfilePrivacyEditStep3: undefined;
  BscAddress: undefined;
  VerifiedTooltipPopUp: {
    hostViewParams: ViewMeasurementsResult;
    correctiveOffset?: number;
  };
  TopMiners: undefined;
  QuizIntro: undefined;
  Quiz: undefined;
  QuizFailure: undefined;
  QuizSuccess: undefined;
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
  UserGrowthGraph: {
    category: 'active' | 'total';
    statsPeriod: StatsPeriod;
  };
  BalanceHistory: undefined;
};

export type TeamTabStackParamList = {
  Team: {snapPoint?: number} | undefined;
};

export type NewsTabStackParamList = {
  News: undefined;
};

export type ProfileTabStackParamList = {
  MyProfile: {actionType?: ProfileActionType; userId?: string};
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
  NewsTabStackParamList &
  HomeTabStackParamList;

const Tabs = createBottomTabNavigator<MainTabsParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const HomeTabStack = createNativeStackNavigator<HomeTabStackParamList>();
const TeamTabStack = createNativeStackNavigator<TeamTabStackParamList>();
const ProfileTabStack = createNativeStackNavigator<ProfileTabStackParamList>();

/**
 * Needs to be on Badges screen to enable swipe to go back over PagerView
 * Note: patches/react-native-screens.patch is also a part of the fix
 */
const badgesOptions = {fullScreenGestureEnabled: true};

const HomeTabStackNavigator = () => (
  <HomeTabStack.Navigator screenOptions={screenOptions}>
    <HomeTabStack.Screen name="Home" component={Home} />
    <HomeTabStack.Screen name="Stats" component={Stats} />
    <HomeTabStack.Screen name="UserGrowthGraph" component={UserGrowthGraph} />
    <HomeTabStack.Screen name="BalanceHistory" component={BalanceHistory} />
  </HomeTabStack.Navigator>
);

const ProfileTabStackNavigator = () => (
  <ProfileTabStack.Navigator
    screenOptions={screenOptions}
    initialRouteName={isLightDesign ? 'Settings' : 'MyProfile'}>
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
          name="NewsTab"
          component={isLightDesign ? Stats : News}
          options={{
            tabBarIcon: isLightDesign ? StatsTabIcon : NewsIcon,
            tabBarIconStyle: iconStyles.newsIconStyle,
          }}
          listeners={getListeners('news')}
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
      <MainStack.Screen
        name="PingReferralsPopUp"
        options={modalOptions}
        component={PingReferralsPopUp}
      />
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
        name="RepostExample"
        options={modalOptions}
        component={RepostExample}
      />
      <MainStack.Screen
        name="DateSelect"
        options={modalOptions}
        component={DateSelect}
      />
      <MainStack.Screen name="FaceRecognition" component={FaceRecognition} />
      <MainStack.Screen name="SocialKycFlow" component={SocialKycFlow} />
      <MainStack.Screen name="Staking" component={Staking} />
      <MainStack.Screen
        name="CreativeIceLibrary"
        component={CreativeIceLibrary}
      />
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
      <MainStack.Screen
        name="BalanceHistoryTooltip"
        component={BalanceHistoryTooltip}
        options={modalOptions}
      />
      <MainStack.Screen
        name="ReferralCountInfo"
        component={ReferralCountInfo}
        options={modalOptions}
      />
      <MainStack.Screen
        name="InAppNotifications"
        component={InAppNotifications}
      />
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
      <MainStack.Screen name="BscAddress" component={BscAddress} />
      <MainStack.Screen
        name="VerifiedTooltipPopUp"
        component={VerifiedTooltipPopUp}
        options={modalOptions}
      />
      <MainStack.Screen name="TopMiners" component={TopMiners} />
      <MainStack.Screen name="QuizIntro" component={QuizIntro} />
      <MainStack.Screen name="Quiz" component={Quiz} />
      <MainStack.Screen name="QuizFailure" component={QuizFailure} />
      <MainStack.Screen name="QuizSuccess" component={QuizSuccess} />
    </MainStack.Navigator>
  );
}

export const iconStyles = StyleSheet.create({
  homeIconStyle: {marginLeft: rem(8)},
  teamIconStyle: {marginLeft: rem(26)},
  newsIconStyle: {marginRight: rem(26)},
  profileIconStyle: {
    marginRight: rem(8),
  },
});
