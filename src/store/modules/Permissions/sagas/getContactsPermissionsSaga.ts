// SPDX-License-Identifier: BUSL-1.1

import {
  hasContactsAccessPermission,
  requestContactsAccessPermission,
} from '@services/contacts';
import {
  PermissionsActions,
  PermissionTypes,
} from '@store/modules/Permissions/actions';
import {Linking} from 'react-native';
import {RESULTS} from 'react-native-permissions';
import {put} from 'redux-saga/effects';

export function* getContactsPermissionsSaga() {
  try {
    const hasPermissions: PermissionTypes = yield hasContactsAccessPermission();

    if (hasPermissions === RESULTS.BLOCKED) {
      Linking.openSettings();
    }

    if (hasPermissions === RESULTS.GRANTED) {
      yield put(
        PermissionsActions.GET_CONTACTS_PERMISSIONS.SUCCESS.create(
          hasPermissions,
        ),
      );
    } else if (hasPermissions === RESULTS.DENIED) {
      const status: PermissionTypes = yield requestContactsAccessPermission();

      yield put(
        PermissionsActions.GET_CONTACTS_PERMISSIONS.SUCCESS.create(status),
      );
    }
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(
      PermissionsActions.GET_CONTACTS_PERMISSIONS.FAILED.create(errorMessage),
    );
  }
}
