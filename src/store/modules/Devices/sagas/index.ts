// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import {initDeviceSaga} from '@store/modules/Devices/sagas/initDevice';
import {updateDeviceLocationSaga} from '@store/modules/Devices/sagas/updateDeviceLocation';
import {updateDeviceMetadataSaga} from '@store/modules/Devices/sagas/updateDeviceMetadata';
import {fork, takeLatest} from 'redux-saga/effects';

export const devicesWatchers = [
  takeLatest(AppCommonActions.APP_LOADED.STATE.type, initDeviceSaga),
  takeLatest(
    [
      DeviceActions.UPDATE_DEVICE_METADATA.START.type,
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      AppCommonActions.APP_INITIALIZED.SUCCESS.type,
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
      AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.type,
    ],
    updateDeviceMetadataSaga,
  ),
  fork(updateDeviceLocationSaga),
];
