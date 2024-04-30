// SPDX-License-Identifier: ice License 1.0

import {stopTrackingCurrentUser} from '@services/analytics';
import {cleanUpSignInProviders, clearPersistedAuthTokens} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import {updateDeviceMetadataSaga} from '@store/modules/Devices/sagas/updateDeviceMetadata';
import {getErrorMessage, showError} from '@utils/errors';
import {all, call, put, spawn} from 'redux-saga/effects';

export function* signOutSaga(
  signOutAction: ReturnType<typeof AccountActions.SIGN_OUT.START.create>,
) {
  try {
    const skipMetadataUpdate = signOutAction.payload.skipMetadataUpdate;

    if (!skipMetadataUpdate) {
      yield call(
        updateDeviceMetadataSaga,
        DeviceActions.UPDATE_DEVICE_METADATA.START.create({
          forceUpdate: true,
          clearDeviceMetadata: true,
        }),
      );
    }

    yield all([
      call(cleanUpSignInProviders),
      call(stopTrackingCurrentUser),
      call(clearPersistedAuthTokens),
    ]);
    yield put(AccountActions.SIGN_OUT.SUCCESS.create());
  } catch (error) {
    yield put(AccountActions.SIGN_OUT.FAILED.create(getErrorMessage(error)));
    yield spawn(showError, error);
    throw error;
  }
}
