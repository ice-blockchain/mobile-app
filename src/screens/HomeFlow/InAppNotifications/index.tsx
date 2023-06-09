// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {NotificationsList} from '@screens/HomeFlow/InAppNotifications/components/NotificationsList';
import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import {
  getInAppNotificationsListDataSelector,
  inAppNotificationsByIdsSelector,
} from '@store/modules/InAppNotifications/selectors';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

export const InAppNotifications = () => {
  useFocusStatusBar({style: 'dark-content'});
  const dispatch = useDispatch();

  const notifications = useSelector(getInAppNotificationsListDataSelector);
  const notificationIds = useSelector(inAppNotificationsByIdsSelector);

  useEffect(() => {
    dispatch(
      InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.START.create({
        isRefresh: true,
      }),
    );
  }, [dispatch]);

  const removeInAppNotifications = () => {
    const ids = Object.keys(notificationIds);
    dispatch(
      InAppNotificationActions.REMOVE_IN_APP_NOTIFICATIONS.START.create(ids),
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <NotificationsList
        notifications={notifications}
        clearAllNotifications={removeInAppNotifications}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
