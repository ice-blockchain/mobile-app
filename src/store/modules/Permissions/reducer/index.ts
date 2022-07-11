// SPDX-License-Identifier: BUSL-1.1

import {PermissionsActions} from '@store/modules/Permissions/actions';
import produce from 'immer';
import {PermissionStatus} from 'react-native-permissions';

export interface State {
  contacts: PermissionStatus | null;
  pushNotifications: PermissionStatus | null;
}

type Actions = ReturnType<
  | typeof PermissionsActions.GET_PERMISSIONS.SUCCESS.create
  | typeof PermissionsActions.CHECK_ALL_PERMISSIONS.SUCCESS.create
>;

const INITIAL_STATE: State = {
  contacts: null,
  pushNotifications: null,
};

export function permissionsReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case PermissionsActions.GET_PERMISSIONS.SUCCESS.type:
        draft.contacts = action.payload.status;
        break;
      case PermissionsActions.CHECK_ALL_PERMISSIONS.SUCCESS.type:
        return action.payload.permissions;
    }
  });
}
