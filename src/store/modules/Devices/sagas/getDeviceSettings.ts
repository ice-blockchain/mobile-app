// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import deviceInfoModule from 'react-native-device-info';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getDeviceSettingsSaga() {
  try {
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const deviceUniqueId = deviceInfoModule.getUniqueId();
    const settings: SagaReturnType<typeof Api.devices.getUserDeviceSettings> =
      yield call(Api.devices.getUserDeviceSettings, {userId, deviceUniqueId});
    yield put(DeviceActions.GET_SETTINGS.SUCCESS.create(settings));
  } catch (error) {
    yield put(DeviceActions.GET_SETTINGS.FAILED.create('error message here'));
  }
}
