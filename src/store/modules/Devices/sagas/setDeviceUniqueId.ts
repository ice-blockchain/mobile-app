// SPDX-License-Identifier: BUSL-1.1

import {DeviceActions} from '@store/modules/Devices/actions';
import {syncUniqueId} from 'react-native-device-info';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* setDeviceUniqueIdSaga() {
  try {
    const deviceUniqueId: SagaReturnType<typeof syncUniqueId> = yield call(
      syncUniqueId,
    );
    yield put(DeviceActions.SET_DEVICE_UNIQUE_ID.STATE.create(deviceUniqueId));
  } catch (error) {
    // TODO::report to Sentry
  }
}
