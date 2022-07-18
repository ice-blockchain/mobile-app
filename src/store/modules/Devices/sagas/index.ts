// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {AuthActions} from '@store/modules/Auth/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import {getOrCreateDeviceSettingsSaga} from '@store/modules/Devices/sagas/getOrCreateDeviceSettings';
import {initDeviceSaga} from '@store/modules/Devices/sagas/initDevice';
import {updateDeviceLocationSaga} from '@store/modules/Devices/sagas/updateDeviceLocation';
import {watchUpdateDeviceSettings} from '@store/modules/Devices/sagas/updateDeviceSettings';
import {all, fork, takeLatest} from 'redux-saga/effects';

export function* rootDevicesSaga() {
  yield all([
    takeLatest(
      [
        DeviceActions.GET_OR_CREATE_SETTINGS.START.type,
        AuthActions.SIGN_IN_SOCIAL.SUCCESS.type,
        AuthActions.SIGN_IN_EMAIL.SUCCESS.type,
        AuthActions.SIGN_IN_PHONE.SUCCESS.type,
      ],
      getOrCreateDeviceSettingsSaga,
    ),
    takeLatest(AuthActions.LOAD_USER.STATE.type, initDeviceSaga),
    takeLatest(
      [
        DeviceActions.UPDATE_DEVICE_LOCATION.START.type,
        AppCommonActions.APP_LOADED.STATE.type,
      ],
      updateDeviceLocationSaga,
    ),
    fork(watchUpdateDeviceSettings),
  ]);
}
