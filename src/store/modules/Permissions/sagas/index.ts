// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {checkAllPermissionsSaga} from './checkAllPermissionsSaga';
import {getPermissionsSaga} from './getPermissionsSaga';

export function* rootPermissionsSaga() {
  yield all([
    takeLatest(
      PermissionsActions.GET_PERMISSIONS.START.type,
      getPermissionsSaga,
    ),
    takeLatest(
      [
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
        AppCommonActions.APP_LOADED.STATE.type,
      ],
      checkAllPermissionsSaga,
    ),
  ]);
}
