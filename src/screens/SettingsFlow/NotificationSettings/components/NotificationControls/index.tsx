// SPDX-License-Identifier: BUSL-1.1

import {NotificationChannel, NotificationSettings} from '@api/devices/types';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {AllNotifications} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls/components/AllNotifications';
import {
  NotificationRow,
  NotificationRowSeparator,
} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls/components/NotificationRow';
import {useConfirmNotificationsDlg} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls/hooks/useConfirmNotificationsDlg';
import {DeviceActions} from '@store/modules/Devices/actions';
import {permissionSelector} from '@store/modules/Permissions/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  disableAllNotifications: boolean;
  notificationSettings: NotificationSettings;
};

export const NotificationControls = memo(
  ({disableAllNotifications, notificationSettings}: Props) => {
    const dispatch = useDispatch();

    const hasPushPermissions = useSelector(
      permissionSelector('pushNotifications'),
    );

    const {openConfirmationDlg} = useConfirmNotificationsDlg();

    const notificationChannels: string[] = Object.keys(notificationSettings);

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
      (channel: string, key: keyof NotificationChannel, value: boolean) => {
        if (key === 'push' && !hasPushPermissions) {
          openConfirmationDlg();
        } else {
          dispatch(
            DeviceActions.UPDATE_SETTINGS.START.create({
              notificationSettings: {[channel]: {[key]: value}},
            }),
          );
        }
      },
      [dispatch, hasPushPermissions, openConfirmationDlg],
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
                  pushEnabled={hasPushPermissions && channelSettings.push}
                  emailEnabled={channelSettings.email}
                  onChange={changeNotificationSettings}
                />
              </React.Fragment>
            );
          })}
        </View>
        <AllNotifications
          label={t('settings.notifications.turn_off_all')}
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
