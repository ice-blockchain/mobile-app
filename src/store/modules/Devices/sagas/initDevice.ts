// SPDX-License-Identifier: ice License 1.0

import {DeviceActions} from '@store/modules/Devices/actions';
import {getErrorMessage} from '@utils/errors';
import {syncUniqueId} from 'react-native-device-info';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* initDeviceSaga() {
  try {
    const deviceUniqueId: SagaReturnType<typeof syncUniqueId> = yield call(
      syncUniqueId,
    );
    yield put(DeviceActions.INIT_DEVICE.SUCCESS.create(deviceUniqueId));
  } catch (error) {
    yield put(DeviceActions.INIT_DEVICE.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
