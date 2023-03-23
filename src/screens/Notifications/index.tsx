// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {NotificationsList} from '@screens/Notifications/components/NotificationsList';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {
  getNotificationsListDataSelector,
  notificationsByIdsSelector,
} from '@store/modules/Notifications/selectors';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

export const Notifications = () => {
  useFocusStatusBar({style: 'dark-content'});
  const dispatch = useDispatch();

  const notifications = useSelector(getNotificationsListDataSelector);
  const notificationIds = useSelector(notificationsByIdsSelector);

  useEffect(() => {
    dispatch(
      NotificationActions.NOTIFICATIONS_LOAD.START.create({isRefresh: true}),
    );
  }, [dispatch]);

  const removeNotifications = () => {
    const ids = Object.keys(notificationIds);
    dispatch(NotificationActions.REMOVE_NOTIFICATIONS.START.create(ids));
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <NotificationsList
        notifications={notifications}
        clearAllNotifications={removeNotifications}
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
