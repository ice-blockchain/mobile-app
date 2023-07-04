// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceUniqueIdSelector} from '@store/modules/Devices/selectors';
import {getErrorMessage} from '@utils/errors';
import {all, call, put, SagaReturnType, select, take} from 'redux-saga/effects';

export function* updateDeviceLocationSaga() {
  try {
    yield all([
      take(AccountActions.USER_STATE_CHANGE.SUCCESS.type),
      take(DeviceActions.INIT_DEVICE.SUCCESS.type),
    ]);

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
