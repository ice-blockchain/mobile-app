// SPDX-License-Identifier: BUSL-1.1

import {
  isAppActiveSelector,
  isAppLoadedSelector,
} from '@store/modules/AppCommon/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {PERMISSIONS_LIST} from '@store/modules/Permissions/sagas/getPermissionsSaga';
import Permissions, {
  checkNotifications,
  PermissionStatus,
} from 'react-native-permissions';
import {put, SagaReturnType, select} from 'redux-saga/effects';

export function* checkAllPermissionsSaga() {
  try {
    const isAppActive: boolean = yield select(isAppActiveSelector);
    const isAppLoaded: boolean = yield select(isAppLoadedSelector);

    if (isAppActive || isAppLoaded) {
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
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(
      PermissionsActions.CHECK_ALL_PERMISSIONS.FAILED.create(errorMessage),
    );
  }
}
