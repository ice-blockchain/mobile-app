// SPDX-License-Identifier: ice License 1.0

import {openUpdateRequired} from '@store/modules/AppUpdate/utils/openUpdateRequired';
import {DeviceActions} from '@store/modules/Devices/actions';
import {call} from 'redux-saga/effects';

export function* updateRequiredSaga(
  action: ReturnType<typeof DeviceActions.UPDATE_DEVICE_METADATA.FAILED.create>,
) {
  if (action.payload.errorCode === 'UPDATE_REQUIRED') {
    yield call(openUpdateRequired);
  }
}
