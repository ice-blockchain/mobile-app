// SPDX-License-Identifier: ice License 1.0

import {UserAvatarHeader} from '@components/UserAvatarHeader';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NotificationControls} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls';
import {useNotificationSettings} from '@screens/SettingsFlow/NotificationSettings/hooks/useNotificationSettings';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const NotificationSettings = () => {
  const route =
    useRoute<RouteProp<ProfileTabStackParamList, 'NotificationSettings'>>();
  const notificationDeliveryChannel = route.params?.notificationDeliveryChannel;

  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();

  const isPushNotificationChannel = notificationDeliveryChannel === 'push';
  const {notificationSettings} = useNotificationSettings(
    isPushNotificationChannel,
  );

  return (
    <View style={styles.container}>
      <Header
        title={
          isPushNotificationChannel
            ? t('settings.push_notifications_title')
            : t('settings.email_notifications_title')
        }
        containerStyle={shadowStyle}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[bottomOffset.current, styles.scrollContent]}
        showsVerticalScrollIndicator={false}>
        <UserAvatarHeader />
        <View style={commonStyles.baseSubScreen}>
          {notificationSettings ? (
            <NotificationControls
              notificationSettings={notificationSettings}
              notificationDeliveryChannel={notificationDeliveryChannel}
            />
          ) : null}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
