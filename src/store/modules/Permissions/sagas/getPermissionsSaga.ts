// SPDX-License-Identifier: BUSL-1.1
import {
  PermissionsActions,
  PermissionTypes,
} from '@store/modules/Permissions/actions';
import {Linking} from 'react-native';
import Permissions, {
  Permission,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {put} from 'redux-saga/effects';
import {isIOS} from 'rn-units';

const actionCreator = PermissionsActions.GET_PERMISSIONS.START.create;

export type PermissionType = 'contacts';

type PermissionsListType = {
  [contacts in PermissionType]: Permission;
};

export const PERMISSIONS_LIST: PermissionsListType = {
  contacts: isIOS
    ? PERMISSIONS.IOS.CONTACTS
    : PERMISSIONS.ANDROID.READ_CONTACTS,
};

export function* getPermissionsSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {type} = action.payload;

    const permission: PermissionTypes = yield Permissions.check(
      PERMISSIONS_LIST[type],
    );

    if (permission === RESULTS.BLOCKED) {
      Linking.openSettings();
    }

    if (permission === RESULTS.GRANTED) {
      yield put(PermissionsActions.GET_PERMISSIONS.SUCCESS.create(permission));
    } else if (permission === RESULTS.DENIED) {
      const status: PermissionTypes = yield Permissions.request(
        PERMISSIONS_LIST[type],
      );

      yield put(PermissionsActions.GET_PERMISSIONS.SUCCESS.create(status));
    } else if (
      permission === RESULTS.LIMITED ||
      permission === RESULTS.UNAVAILABLE
    ) {
      throw new Error('Permission LIMITED or UNAVAILABLE');
    }
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(PermissionsActions.GET_PERMISSIONS.FAILED.create(errorMessage));
  }
}
