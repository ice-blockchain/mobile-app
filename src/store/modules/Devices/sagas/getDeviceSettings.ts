// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {DeviceActions} from '@store/modules/Devices/actions';
import {call, delay, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = DeviceActions.GET_SETTINGS.START.create;

export function* getDeviceSettingsSaga(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action: ReturnType<typeof actionCreator>,
) {
  try {
    yield delay(2000);
    const settings: SagaReturnType<typeof Api.devices.getDeviceSettings> =
      yield call(Api.devices.getDeviceSettings, {
        userId: '',
        deviceId: '',
      });
    yield put(DeviceActions.GET_SETTINGS.SUCCESS.create(settings));
  } catch (error) {
    yield put(DeviceActions.GET_SETTINGS.FAILED.create('error message here'));
  }
}
