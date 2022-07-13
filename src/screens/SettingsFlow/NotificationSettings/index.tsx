// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {
  NotificationControls,
  NotificationControlsSkeleton,
} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceSettingsSelector} from '@store/modules/Devices/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {font, rem} from 'rn-units';

export const NotificationSettings = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DeviceActions.GET_OR_CREATE_SETTINGS.START.create());
  }, [dispatch]);

  const settings = useSelector(deviceSettingsSelector);
  const isLoading = useSelector(
    isLoadingSelector.bind(null, DeviceActions.GET_OR_CREATE_SETTINGS),
  );

  return (
    <View style={styles.container}>
      <Header
        color={COLORS.white}
        title={t('settings.notifications_title')}
        titlePreset={'small'}
        containerStyle={shadowStyle}
        renderRightButtons={LangButton}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[bottomOffset.current, styles.scrollContent]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <Avatar
            showPen
            uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
            style={styles.avatar}
          />
          <Text style={styles.titleText}>
            {t('settings.notifications_title').toUpperCase()}
          </Text>
          {isLoading && !settings ? (
            <NotificationControlsSkeleton />
          ) : (
            !!settings && (
              <NotificationControls
                notificationSettings={settings.notificationSettings}
                disableAllNotifications={settings.disableAllNotifications}
              />
            )
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(80),
    // make bottom overscroll area white, otherwise it'd be of container color
    paddingBottom: 2000,
    marginBottom: -2000,
  },
  scrollContent: {
    flexGrow: 1,
  },
  avatar: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
  },
  titleText: {
    fontSize: font(14),
    lineHeight: font(17),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
    marginTop: rem(54),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
