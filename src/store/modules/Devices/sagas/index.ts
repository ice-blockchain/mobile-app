// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import {watchUpdateDeviceSettings} from '@store/modules/Devices/sagas/updateDeviceSettings';
import {all, fork, takeLatest} from 'redux-saga/effects';

import {getDeviceSettingsSaga} from './getDeviceSettings';
import {setDeviceUniqueIdSaga} from './setDeviceUniqueId';

export function* rootDevicesSaga() {
  yield all([
    takeLatest(DeviceActions.GET_SETTINGS.START.type, getDeviceSettingsSaga),
    takeLatest(AppCommonActions.APP_LOADED.STATE.type, setDeviceUniqueIdSaga),
    fork(watchUpdateDeviceSettings),
  ]);
}
