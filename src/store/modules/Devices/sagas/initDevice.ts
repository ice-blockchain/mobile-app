// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client/utils';
import {DeviceSettings} from '@api/devices/types';
import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Auth/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import i18n from '@translations/i18n';
import {syncUniqueId} from 'react-native-device-info';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* initDeviceSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const deviceUniqueId: SagaReturnType<typeof syncUniqueId> = yield call(
      syncUniqueId,
    );

    if (isAuthorized) {
      let settings: DeviceSettings;
      const userId: ReturnType<typeof userIdSelector> = yield select(
        userIdSelector,
      );
      try {
        settings = yield call(Api.devices.getUserDeviceSettings, {
          userId,
          deviceUniqueId,
        });
        if (settings.language !== i18n.currentLocale()) {
          i18n.locale = settings.language;
        }
      } catch (error) {
        if (isApiError(error) && error.code === 'DEVICE_SETTINGS_NOT_FOUND') {
          settings = yield call(
            Api.devices.createUserDeviceSettings,
            {userId, deviceUniqueId},
            {language: i18n.locale},
          );
        } else {
          throw error;
        }
      }
      yield put(
        DeviceActions.INIT_DEVICE.STATE.create(deviceUniqueId, settings),
      );
    } else {
      yield put(DeviceActions.INIT_DEVICE.STATE.create(deviceUniqueId, null));
    }
  } catch (error) {
    // TODO::report to Sentry
  }
}
