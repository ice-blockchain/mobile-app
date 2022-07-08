// SPDX-License-Identifier: BUSL-1.1

import {NotificationSettings} from '@api/devices/types';
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

type Props = {
  disableAllNotifications: boolean;
  notificationSettings: NotificationSettings;
};

export const NotificationControls = memo(
  ({disableAllNotifications, notificationSettings}: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, setValue] = useState(false);
    const notificationChannels = Object.keys(
      notificationSettings,
    ) as (keyof typeof notificationSettings)[];

    return (
      <>
        <View style={[styles.list, commonStyles.shadow]}>
          {notificationChannels.map((channel, index) => {
            const channelSettings = notificationSettings[channel];
            return (
              <React.Fragment key={channel}>
                {index !== 0 && <NotificationRowSeparator />}
                <NotificationRow
                  label={channel}
                  pushEnabled={channelSettings.push}
                  emailEnabled={channelSettings.email}
                  onPushEnabledChange={setValue}
                  onEmailEnabledChange={setValue}
                />
              </React.Fragment>
            );
          })}
        </View>
        <AllNotifications
          label={'TURN OFF ALL NOTIFICATIONS'}
          value={disableAllNotifications}
          onValueChange={setValue}
        />
      </>
    );
  },
);

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
    height: rem(20),
    borderRadius: rem(10),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
