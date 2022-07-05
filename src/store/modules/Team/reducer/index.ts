// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {IContact} from '@services/contacts';
import {AuthActions} from '@store/modules/Auth/actions';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {TeamActions} from '@store/modules/Team/actions';
import produce from 'immer';
import {RESULTS} from 'react-native-permissions';
import {persistReducer} from 'redux-persist';

export interface ContactById {
  [id: string]: IContact & {isActive: boolean; backgroundColor: string};
}

type TContactsFlow =
  | 'ContactsPermissions'
  | 'ConfirmPhone'
  | 'ConfirmCode'
  | 'ContactsList';
export interface State {
  isPhoneNumberVerified: boolean;
  iceFriends: string[];
  contactsByIds: ContactById;
  contactsIds: string[];
  contactScreenState: TContactsFlow;
}

type Actions = ReturnType<
  | typeof TeamActions.SET_PHONE_NUMBER_VERIFIED.STATE.create
  | typeof TeamActions.SET_CODE_VERIFIED.STATE.create
  | typeof TeamActions.INVITE_CONTACT.STATE.create
  | typeof TeamActions.SET_CONTACTS_BY_IDS.STATE.create
  | typeof TeamActions.SET_CONTACTS_IDS.STATE.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof PermissionsActions.GET_CONTACTS_PERMISSIONS.SUCCESS.create
>;

const INITIAL_STATE: State = {
  isPhoneNumberVerified: false,
  iceFriends: [],
  contactsByIds: {},
  contactsIds: [],
  contactScreenState: 'ContactsPermissions',
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case PermissionsActions.GET_CONTACTS_PERMISSIONS.SUCCESS.type: {
        const activeScreen =
          action.payload.status === RESULTS.GRANTED
            ? 'ConfirmPhone'
            : 'ContactsPermissions';
        draft.contactScreenState = activeScreen;
        break;
      }
      case TeamActions.SET_PHONE_NUMBER_VERIFIED.STATE.type: {
        draft.contactScreenState = 'ConfirmCode';
        break;
      }
      case TeamActions.SET_CODE_VERIFIED.STATE.type: {
        draft.contactScreenState = 'ContactsList';
        break;
      }
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
};

export const teamReducer = persistReducer(persistConfig, reducer);
