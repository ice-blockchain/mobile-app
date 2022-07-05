// SPDX-License-Identifier: BUSL-1.1

import {hasContactsAccessPermission} from '@services/contacts';
import {
  isAppActiveSelector,
  isAppLoadedSelector,
} from '@store/modules/AppCommon/selectors';
import {
  PermissionsActions,
  PermissionTypes,
} from '@store/modules/Permissions/actions';
import {put, select} from 'redux-saga/effects';

export function* checkAllPermissionsSaga() {
  try {
    const isAppActive: boolean = yield select(isAppActiveSelector);
    const isAppLoaded: boolean = yield select(isAppLoadedSelector);

    if (isAppActive || isAppLoaded) {
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
