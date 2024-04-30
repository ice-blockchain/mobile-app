// SPDX-License-Identifier: ice License 1.0

import {NotificationActions} from '@store/modules/Notifications/actions';
import {
  emailNotificationByTypeSelector,
  pushNotificationByTypeSelector,
} from '@store/modules/Notifications/selectors';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useNotificationSettings = (isPushNotificationChannel: boolean) => {
  const dispatch = useDispatch();

  const notificationSettings = useSelector(
    isPushNotificationChannel
      ? pushNotificationByTypeSelector
      : emailNotificationByTypeSelector,
  );

  useEffect(() => {
    dispatch(NotificationActions.GET_NOTIFICATION_SETTINGS.START.create());
  }, [dispatch]);

  return {
    notificationSettings,
  };
};
