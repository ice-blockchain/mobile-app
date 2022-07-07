// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {AllNotifications} from '@screens/SettingsFlow/Notifications/components/AllNotifications';
import {
  NotificationRow,
  NotificationRowSeparator,
} from '@screens/SettingsFlow/Notifications/components/NotificationRow';
import React, {memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

export const Notifications = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const [value, setValue] = useState(false);

  return (
    <View style={styles.container}>
      <Header
        color={COLORS.white}
        title={'Notifications'}
        titlePreset={'small'}
        renderRightButtons={LangButton}
      />
      <View
        style={[styles.card, commonStyles.baseSubScreen, bottomOffset.current]}>
        <Avatar
          showPen
          uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
          style={styles.avatar}
        />
        <Text style={styles.titleText}>NOTIFICATIONS</Text>
        <View style={[styles.list, commonStyles.shadow]}>
          <NotificationRow
            label="Notifications type 1"
            pushEnabled={value}
            emailEnabled={value}
            onPushEnabledChange={setValue}
            onEmailEnabledChange={setValue}
          />
          <NotificationRowSeparator />
          <NotificationRow
            label="Notifications type 1"
            pushEnabled={value}
            emailEnabled={value}
            onPushEnabledChange={setValue}
            onEmailEnabledChange={setValue}
          />
          <NotificationRowSeparator />
          <NotificationRow
            label="Notifications type 1"
            pushEnabled={value}
            emailEnabled={value}
            onPushEnabledChange={setValue}
            onEmailEnabledChange={setValue}
          />
        </View>
        <AllNotifications
          label={'TURN OFF ALL NOTIFICATIONS'}
          value={value}
          onValueChange={setValue}
        />
      </View>
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
  list: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(21),
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
  },
});
