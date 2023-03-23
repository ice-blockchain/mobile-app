// SPDX-License-Identifier: ice License 1.0

import {DeviceActions} from '@store/modules/Devices/actions';
import {
  emailNotificationByTypeSelector,
  pushNotificationByTypeSelector,
} from '@store/modules/Devices/selectors';
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
    dispatch(DeviceActions.GET_OR_CREATE_DEVICE_SETTINGS.START.create());
  }, [dispatch]);

  return {
    notificationSettings,
  };
};
