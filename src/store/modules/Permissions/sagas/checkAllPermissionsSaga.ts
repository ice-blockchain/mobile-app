// SPDX-License-Identifier: BUSL-1.1

import {hasContactsAccessPermission} from '@services/contacts';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {
  PermissionsActions,
  PermissionTypes,
} from '@store/modules/Permissions/actions';
import {put, select} from 'redux-saga/effects';

export function* checkAllPermissionsSaga() {
  try {
    const isAppActive: boolean = yield select(isAppActiveSelector);

    if (isAppActive) {
      const contacts: PermissionTypes = yield hasContactsAccessPermission();
      const permissions = {
        contacts: contacts,
      };
      yield put(
        PermissionsActions.CHECK_ALL_PERMISSIONS.SUCCESS.create(permissions),
      );
    }
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(
      PermissionsActions.CHECK_ALL_PERMISSIONS.FAILED.create(errorMessage),
    );
  }
}
