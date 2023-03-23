// SPDX-License-Identifier: ice License 1.0

import {DeviceSettings, NotificationDomainToggles} from '@api/devices/types';
import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {AnalyticsAttributesLogger} from '@store/modules/Analytics/constants';
import {DeviceActions} from '@store/modules/Devices/actions';
import {getErrorMessage} from '@utils/errors';
import {syncUniqueId} from 'react-native-device-info';
import {all, call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* initDeviceSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const deviceUniqueId: SagaReturnType<typeof syncUniqueId> = yield call(
      syncUniqueId,
    );

    let settings: DeviceSettings | null = null;
    if (isAuthorized) {
      const userId: ReturnType<typeof userIdSelector> = yield select(
        userIdSelector,
      );
      settings = yield call(getOrCreateDeviceSettings, {
        userId,
        deviceUniqueId,
      });
    }

    yield put(
      DeviceActions.GET_OR_CREATE_DEVICE_SETTINGS.SUCCESS.create(
        deviceUniqueId,
        settings,
      ),
    );
    if (settings) {
      AnalyticsAttributesLogger.updateNotificationPreferences({
        notificationDeliveryChannel: 'push',
      });
      AnalyticsAttributesLogger.updateNotificationPreferences({
        notificationDeliveryChannel: 'email',
      });
    }
  } catch (error) {
    yield put(
      DeviceActions.GET_OR_CREATE_DEVICE_SETTINGS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}

export function* getOrCreateDeviceSettings({
  userId,
  deviceUniqueId,
}: {
  userId: string;
  deviceUniqueId: string;
}) {
  let emailNotificationChannel: NotificationDomainToggles;
  let pushNotificationChannel: NotificationDomainToggles;
  try {
    [emailNotificationChannel, pushNotificationChannel] = yield all([
      call(Api.devices.getUserNotificationChannels, 'email'),
      call(Api.devices.getUserNotificationChannels, 'push'),
    ]);
  } catch (error) {
    throw error;
  }

  const deviceSettings: DeviceSettings = {
    userId,
    deviceUniqueId,
    disableAllNotifications: false,
    emailNotificationSettings: emailNotificationChannel,
    pushNotificationSettings: pushNotificationChannel,
  };

  return deviceSettings;
}
