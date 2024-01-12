// SPDX-License-Identifier: ice License 1.0

import {DISABLE_ALL_NOTIFICATION_DOMAIN} from '@api/notifications/constants';
import {
  NotificationDeliveryChannel,
  NotificationDomainToggles,
} from '@api/notifications/types';
import {isLightDesign} from '@constants/featureFlags';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AllNotifications} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls/components/AllNotifications';
import {NotificationRow} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls/components/NotificationRow';
import {useConfirmNotificationsDlg} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls/hooks/useConfirmNotificationsDlg';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {t} from '@translations/i18n';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  notificationSettings: NotificationDomainToggles;
  notificationDeliveryChannel: NotificationDeliveryChannel;
};

const LIGHT_DESIGN_NOTIFICATION_TYPES = new Set([
  'disable_all',
  'weekly_stats',
  'weekly_report',
  'news',
  'system',
]);

export const NotificationControls = ({
  notificationSettings,
  notificationDeliveryChannel,
}: Props) => {
  const dispatch = useDispatch();
  const hasPushPermissions = useSelector(
    isPermissionGrantedSelector('pushNotifications'),
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const isPushNotificationChannel = notificationDeliveryChannel === 'push';

  const {openConfirmationDlg} = useConfirmNotificationsDlg();

  const changeNotificationSettings = useCallback(
    (type: string, value: boolean) => {
      if (isPushNotificationChannel && !hasPushPermissions) {
        openConfirmationDlg();
      } else {
        dispatch(
          NotificationActions.UPDATE_NOTIFICATION_CHANNEL.START.create(
            {type, enabled: value},
            notificationDeliveryChannel,
          ),
        );
      }
    },
    [
      dispatch,
      hasPushPermissions,
      isPushNotificationChannel,
      notificationDeliveryChannel,
      openConfirmationDlg,
    ],
  );

  const onDisableAllNotifications = useCallback(() => {
    navigation.navigate({
      name: 'PopUp',
      key: 'confirm-disable-notifications-popup',
      params: {
        title: t('settings.notifications.disable_notifications'),
        message: t('settings.notifications.disable_notifications_description'),
        buttons: [
          {
            text: t('button.disable'),
            preset: 'outlined',
            onPress: () =>
              changeNotificationSettings(DISABLE_ALL_NOTIFICATION_DOMAIN, true),
          },
          {
            text: t('button.cancel'),
          },
        ],
      },
    });
  }, [changeNotificationSettings, navigation]);

  const disableAll = notificationSettings.find(
    notificationSetting => notificationSetting.type === 'disable_all',
  );
  return (
    <View style={styles.notificationsContainer}>
      {notificationSettings
        .filter(({type}) => {
          if (isLightDesign) {
            return LIGHT_DESIGN_NOTIFICATION_TYPES.has(type);
          }
          return true;
        })
        .map(({type, enabled}) => {
          if (type === DISABLE_ALL_NOTIFICATION_DOMAIN) {
            return (
              <AllNotifications
                key={type}
                label={
                  isPushNotificationChannel
                    ? t('settings.push_notifications_title')
                    : t('settings.email_notifications_title')
                }
                value={
                  !enabled && (!isPushNotificationChannel || hasPushPermissions)
                }
                onValueChange={(value: boolean) => {
                  if (value) {
                    changeNotificationSettings(
                      DISABLE_ALL_NOTIFICATION_DOMAIN,
                      false,
                    );
                  } else {
                    onDisableAllNotifications();
                  }
                }}
              />
            );
          }
          return (
            <NotificationRow
              key={type}
              onPress={() => changeNotificationSettings(type, !enabled)}
              type={type}
              checked={enabled}
              disabled={
                !!disableAll?.enabled ||
                (isPushNotificationChannel && !hasPushPermissions)
              }
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationsContainer: {
    paddingHorizontal: rem(20),
    paddingTop: rem(18),
  },
});
