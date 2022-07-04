// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthActions} from '@store/modules/Auth/actions';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {TeamActions} from '@store/modules/Team/actions';
import {IFormattedContact} from '@store/modules/Team/sagas/getContactsSaga';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface ContactById {
  [id: string]: IFormattedContact & {
    isActive: boolean;
    backgroundColor: string;
  };
}
export interface State {
  isPhoneNumberVerified: boolean;
  iceFriends: string[];
  contactsByIds: ContactById;
  contactsIds: string[];
}

type Actions = ReturnType<
  | typeof TeamActions.INVITE_CONTACT.STATE.create
  | typeof TeamActions.SET_CONTACTS_BY_IDS.STATE.create
  | typeof TeamActions.SET_CONTACTS_IDS.STATE.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof PermissionsActions.GET_PERMISSIONS.SUCCESS.create
>;

const INITIAL_STATE: State = {
  isPhoneNumberVerified: false,
  iceFriends: [],
  contactsByIds: {},
  contactsIds: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case TeamActions.SET_CONTACTS_BY_IDS.STATE.type: {
        draft.contactsByIds = action.payload.contactsByIds;
        break;
      }
      case TeamActions.SET_CONTACTS_IDS.STATE.type: {
        draft.contactsIds = action.payload.contactsIds;
        break;
      }
      case TeamActions.INVITE_CONTACT.STATE.type: {
        draft.iceFriends = [...draft.iceFriends, action.payload.id];
        break;
      }
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

const persistConfig = {
  key: 'team',
  storage: AsyncStorage,
  timeout: 120000,
  blacklist: ['contactsByIds, contactsIds'],
};

export const teamReducer = persistReducer(persistConfig, reducer);
