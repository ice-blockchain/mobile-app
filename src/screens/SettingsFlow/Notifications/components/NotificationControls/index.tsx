// SPDX-License-Identifier: BUSL-1.1

import {NotificationSettings} from '@api/devices/types';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {AllNotifications} from '@screens/SettingsFlow/Notifications/components/NotificationControls/components/AllNotifications';
import {
  NotificationRow,
  NotificationRowSeparator,
} from '@screens/SettingsFlow/Notifications/components/NotificationControls/components/NotificationRow';
import {DeviceActions} from '@store/modules/Devices/actions';
import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useDispatch} from 'react-redux';
import {DeepPartial} from 'redux';
import {rem} from 'rn-units';

type Props = {
  disableAllNotifications: boolean;
  notificationSettings: NotificationSettings;
};

export const NotificationControls = memo(
  ({disableAllNotifications, notificationSettings}: Props) => {
    const dispatch = useDispatch();
    const notificationChannels = Object.keys(
      notificationSettings,
    ) as (keyof typeof notificationSettings)[];

    const setAllNotifications = useCallback(
      (value: boolean) => {
        dispatch(
          DeviceActions.UPDATE_SETTINGS.START.create({
            disableAllNotifications: value,
          }),
        );
      },
      [dispatch],
    );

    const changeNotificationSettings = useCallback(
      (changedSettings: DeepPartial<NotificationSettings>) => {
        dispatch(
          DeviceActions.UPDATE_SETTINGS.START.create({
            notificationSettings: changedSettings,
          }),
        );
      },
      [dispatch],
    );

    return (
      <>
        <View style={[styles.list, commonStyles.shadow]}>
          {notificationChannels.map((channel, index) => {
            const channelSettings = notificationSettings[channel];
            return (
              <React.Fragment key={channel}>
                {index !== 0 && <NotificationRowSeparator />}
                <NotificationRow
                  channel={channel}
                  pushEnabled={channelSettings.push}
                  emailEnabled={channelSettings.email}
                  onChange={changeNotificationSettings}
                />
              </React.Fragment>
            );
          })}
        </View>
        <AllNotifications
          label={'TURN OFF ALL NOTIFICATIONS'}
          value={disableAllNotifications}
          onValueChange={setAllNotifications}
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
