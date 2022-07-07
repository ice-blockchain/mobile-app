// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {AllNotifications} from '@screens/SettingsFlow/Notifications/components/NotificationControls/components/AllNotifications';
import {
  NotificationRow,
  NotificationRowSeparator,
} from '@screens/SettingsFlow/Notifications/components/NotificationControls/components/NotificationRow';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

export const NotificationControls = memo(() => {
  const [value, setValue] = useState(false);
  return (
    <>
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
    </>
  );
});

export const NotificationControlsSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={[styles.list, styles.listSkeleton]} />
    <View style={styles.allNotificationsSkeleton} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  list: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(21),
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
  },
  listSkeleton: {
    height: rem(205),
  },
  allNotificationsSkeleton: {
    marginTop: rem(42),
    height: 20,
    borderRadius: rem(10),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
