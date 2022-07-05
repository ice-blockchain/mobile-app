// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PermissionsActions,
  PermissionTypes,
} from '@store/modules/Permissions/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  contacts: PermissionTypes | null;
}

type Actions = ReturnType<
  | typeof PermissionsActions.GET_CONTACTS_PERMISSIONS.SUCCESS.create
  | typeof PermissionsActions.CHECK_ALL_PERMISSIONS.SUCCESS.create
>;

const INITIAL_STATE: State = {
  contacts: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case PermissionsActions.GET_CONTACTS_PERMISSIONS.SUCCESS.type:
        draft.contacts = action.payload.status;
        break;
      case PermissionsActions.CHECK_ALL_PERMISSIONS.SUCCESS.type:
        draft = action.payload.permissions;
        break;
    }
  });
}

const persistConfig = {
  key: 'permissions',
  storage: AsyncStorage,
  timeout: 120000,
};

export const permissionsReducer = persistReducer(persistConfig, reducer);
