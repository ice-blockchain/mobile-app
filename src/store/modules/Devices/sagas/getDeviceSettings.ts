// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceUniqueIdSelector} from '@store/modules/Devices/selectors';
import {call, put, SagaReturnType, select, take} from 'redux-saga/effects';

export function* getDeviceSettingsSaga() {
  try {
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    let deviceUniqueId: ReturnType<typeof deviceUniqueIdSelector> =
      yield select(deviceUniqueIdSelector);
    if (!deviceUniqueId) {
      const action: ReturnType<
        typeof DeviceActions.SET_DEVICE_UNIQUE_ID.STATE.create
      > = yield take(DeviceActions.SET_DEVICE_UNIQUE_ID.STATE.type);
      deviceUniqueId = action.payload.deviceUniqueId;
    }
    const settings: SagaReturnType<typeof Api.devices.getUserDeviceSettings> =
      yield call(Api.devices.getUserDeviceSettings, {userId, deviceUniqueId});
    yield put(DeviceActions.GET_SETTINGS.SUCCESS.create(settings));
  } catch (error) {
    yield put(DeviceActions.GET_SETTINGS.FAILED.create('error message here'));
  }
}
