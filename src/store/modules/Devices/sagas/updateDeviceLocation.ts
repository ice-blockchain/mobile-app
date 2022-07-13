// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceUniqueIdSelector} from '@store/modules/Devices/selectors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* updateDeviceLocationSaga() {
  try {
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    let deviceUniqueId: ReturnType<typeof deviceUniqueIdSelector> =
      yield select(deviceUniqueIdSelector);
    const location: SagaReturnType<typeof Api.devices.updateDeviceLocation> =
      yield call(Api.devices.updateDeviceLocation, {
        userId: userId ?? '-',
        deviceUniqueId: deviceUniqueId ?? '-',
      });
    yield put(DeviceActions.UPDATE_DEVICE_LOCATION.SUCCESS.create(location));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(DeviceActions.UPDATE_DEVICE_LOCATION.FAILED.create(errorMessage));
  }
}
