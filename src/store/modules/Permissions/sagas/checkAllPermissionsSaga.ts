// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {PERMISSIONS_LIST} from '@store/modules/Permissions/sagas/getPermissionsSaga';
import {getErrorMessage} from '@utils/errors';
import Permissions, {checkNotifications} from 'react-native-permissions';
import {put, SagaReturnType, select} from 'redux-saga/effects';

export function* checkAllPermissionsSaga(
  action: ReturnType<
    | typeof AppCommonActions.APP_STATE_CHANGE.STATE.create
    | typeof AppCommonActions.APP_LOADED.STATE.create
  >,
) {
  try {
    const isAppActive: boolean = yield select(isAppActiveSelector);

    /**
     * The purpose of the check is to skip useless permission fetches when the app goes
     * from foreground to background (or an intermediate state).
     * But the App may be launched in the headless mode
     * and we still need to fetch the permissions in this case.
     */
    if (
      !isAppActive &&
      action.type === AppCommonActions.APP_STATE_CHANGE.STATE.type
    ) {
      return;
    }

    const contacts: SagaReturnType<typeof Permissions.check> =
      yield Permissions.check(PERMISSIONS_LIST.contacts);

    const camera: SagaReturnType<typeof Permissions.check> =
      yield Permissions.check(PERMISSIONS_LIST.camera);

    const pushNotificationsResponse: SagaReturnType<typeof checkNotifications> =
      yield checkNotifications();

    const permissions = {
      contacts,
      camera,
      pushNotifications: pushNotificationsResponse.status,
    };
    yield put(
      PermissionsActions.CHECK_ALL_PERMISSIONS.SUCCESS.create(permissions),
    );
  } catch (error) {
    yield put(
      PermissionsActions.CHECK_ALL_PERMISSIONS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
