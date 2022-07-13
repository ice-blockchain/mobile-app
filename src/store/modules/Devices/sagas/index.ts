// SPDX-License-Identifier: BUSL-1.1

import {AuthActions} from '@store/modules/Auth/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import {initDeviceSaga} from '@store/modules/Devices/sagas/initDevice';
import {watchUpdateDeviceSettings} from '@store/modules/Devices/sagas/updateDeviceSettings';
import {all, fork, takeLatest} from 'redux-saga/effects';

export function* rootDevicesSaga() {
  yield all([
    takeLatest(
      [
        DeviceActions.GET_SETTINGS.START.type,
        AuthActions.LOAD_USER.STATE.type,
        AuthActions.SIGN_IN_SOCIAL.SUCCESS.type,
        AuthActions.SIGN_IN_EMAIL.SUCCESS.type,
        AuthActions.SIGN_IN_PHONE.SUCCESS.type,
      ],
      initDeviceSaga,
    ),
    fork(watchUpdateDeviceSettings),
  ]);
}
