// SPDX-License-Identifier: ice License 1.0

import {stopTrackingCurrentUser} from '@services/analytics';
import {signOut} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import {updateDeviceMetadataSaga} from '@store/modules/Devices/sagas/updateDeviceMetadata';
import {getErrorMessage, showError} from '@utils/errors';
import {call, put} from 'redux-saga/effects';

export function* signOutSaga(
  signOutAction: ReturnType<typeof AccountActions.SIGN_OUT.START.create>,
) {
  try {
    const accountDeleted = signOutAction.payload.accountDeleted;

    if (!accountDeleted) {
      yield call(
        updateDeviceMetadataSaga,
        DeviceActions.UPDATE_DEVICE_METADATA.START.create({
          forceUpdate: true,
          clearDeviceMetadata: true,
        }),
      );
    }

    yield call(stopTrackingCurrentUser);
    yield call(signOut);
    yield put(AccountActions.SIGN_OUT.SUCCESS.create());
  } catch (error) {
    yield put(AccountActions.SIGN_OUT.FAILED.create(getErrorMessage(error)));
    showError(error);
    throw error;
  }
}
