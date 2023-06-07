// SPDX-License-Identifier: ice License 1.0
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {waitForSelector} from '@store/utils/sagas/effects';
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
import {call, put, SagaReturnType} from 'redux-saga/effects';
import {isIOS} from 'rn-units';

const actionCreator = PermissionsActions.GET_PERMISSIONS.START.create;

type PermissionsListType = {
  contacts: Permission;
  camera: Permission;
};

export const PERMISSIONS_LIST: PermissionsListType = {
  contacts: isIOS
    ? PERMISSIONS.IOS.CONTACTS
    : PERMISSIONS.ANDROID.READ_CONTACTS,
  camera: isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
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
    } else if (permission === RESULTS.GRANTED) {
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
      // on iOS the app moves to the background state
      // when the native permissions dialog appears
      yield call(waitForSelector, isAppActiveSelector);
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
