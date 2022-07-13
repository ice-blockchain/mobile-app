// SPDX-License-Identifier: BUSL-1.1

import {DeviceSettings} from '@api/devices/types';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Auth/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {getOrCreateDeviceSettings} from '@store/modules/Devices/sagas/getOrCreateDeviceSettings';
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

    yield put(DeviceActions.INIT_DEVICE.STATE.create(deviceUniqueId, settings));
  } catch (error) {
    // TODO::report to Sentry
  }
}
