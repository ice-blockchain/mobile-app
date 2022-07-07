// SPDX-License-Identifier: BUSL-1.1

import {DeviceActions} from '@store/modules/Devices/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {getDeviceSettingsSaga} from './getDeviceSettings';

export function* rootDevicesSaga() {
  yield all([
    takeLatest(DeviceActions.GET_SETTINGS.START.type, getDeviceSettingsSaga),
  ]);
}
