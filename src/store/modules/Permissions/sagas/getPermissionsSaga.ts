// SPDX-License-Identifier: ice License 1.0
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {getErrorMessage} from '@utils/errors';
import {Linking} from 'react-native';
import {
  check,
  checkNotifications,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import {put, SagaReturnType} from 'redux-saga/effects';
import {isIOS} from 'rn-units';

const actionCreator = PermissionsActions.GET_PERMISSIONS.START.create;

export type PermissionType = 'contacts' | 'pushNotifications';

type PermissionsListType = {
  contacts: Permission;
};

export const PERMISSIONS_LIST: PermissionsListType = {
  contacts: isIOS
    ? PERMISSIONS.IOS.CONTACTS
    : PERMISSIONS.ANDROID.READ_CONTACTS,
};

export function* getPermissionsSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {type} = action.payload;

    let permission: PermissionStatus;
    if (type === 'pushNotifications') {
      const notificationResponse: SagaReturnType<typeof checkNotifications> =
        yield checkNotifications();
      permission = notificationResponse.status;
    } else {
      permission = yield check(PERMISSIONS_LIST[type]);
    }

    if (permission === RESULTS.BLOCKED) {
      Linking.openSettings();
    }

    if (permission === RESULTS.GRANTED) {
      yield put(
        PermissionsActions.GET_PERMISSIONS.SUCCESS.create(type, permission),
      );
    } else if (permission === RESULTS.DENIED) {
      if (type === 'pushNotifications') {
        const notificationResponse: SagaReturnType<typeof checkNotifications> =
          yield requestNotifications(['alert', 'badge', 'sound']);
        permission = notificationResponse.status;
      } else {
        permission = yield request(PERMISSIONS_LIST[type]);
      }

      yield put(
        PermissionsActions.GET_PERMISSIONS.SUCCESS.create(type, permission),
      );
    } else if (
      permission === RESULTS.LIMITED ||
      permission === RESULTS.UNAVAILABLE
    ) {
      throw new Error('Permission LIMITED or UNAVAILABLE');
    }
  } catch (error) {
    yield put(
      PermissionsActions.GET_PERMISSIONS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
