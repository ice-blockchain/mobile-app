// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {checkAllPermissionsSaga} from './checkAllPermissionsSaga';
import {getContactsPermissionsSaga} from './getContactsPermissionsSaga';

export function* rootPermissionsSaga() {
  yield all([
    takeLatest(
      PermissionsActions.GET_CONTACTS_PERMISSIONS.START.type,
      getContactsPermissionsSaga,
    ),
    takeLatest(
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
      checkAllPermissionsSaga,
    ),
  ]);
}
