// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceUniqueIdSelector} from '@store/modules/Devices/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* updateDeviceLocationSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const userId: ReturnType<typeof userIdSelector> = isAuthorized
      ? yield select(userIdSelector)
      : '-';
    let deviceUniqueId: ReturnType<typeof deviceUniqueIdSelector> =
      yield select(deviceUniqueIdSelector);
    const location: SagaReturnType<typeof Api.devices.updateDeviceLocation> =
      yield call(Api.devices.updateDeviceLocation, {userId, deviceUniqueId});
    yield put(DeviceActions.UPDATE_DEVICE_LOCATION.SUCCESS.create(location));
  } catch (error) {
    yield put(
      DeviceActions.UPDATE_DEVICE_LOCATION.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
