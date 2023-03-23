// SPDX-License-Identifier: ice License 1.0

import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {PERMISSIONS_LIST} from '@store/modules/Permissions/sagas/getPermissionsSaga';
import {getErrorMessage} from '@utils/errors';
import Permissions, {
  checkNotifications,
  PermissionStatus,
} from 'react-native-permissions';
import {put, SagaReturnType, select} from 'redux-saga/effects';

export function* checkAllPermissionsSaga() {
  try {
    const isAppActive: boolean = yield select(isAppActiveSelector);

    if (isAppActive) {
      const contacts: PermissionStatus = yield Permissions.check(
        PERMISSIONS_LIST.contacts,
      );

      const pushNotificationsResponse: SagaReturnType<
        typeof checkNotifications
      > = yield checkNotifications();

      const permissions = {
        contacts,
        pushNotifications: pushNotificationsResponse.status,
      };
      yield put(
        PermissionsActions.CHECK_ALL_PERMISSIONS.SUCCESS.create(permissions),
      );
    }
  } catch (error) {
    yield put(
      PermissionsActions.CHECK_ALL_PERMISSIONS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
