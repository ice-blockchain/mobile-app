// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {ContactsActions} from '@store/modules/Contacts/actions';
import produce from 'immer';
import {Contact} from 'react-native-contacts';
import {persistReducer} from 'redux-persist';

export interface State {
  search: {active: boolean};
  contacts: Contact[];
  numberOfSyncedContacts: number | null;
}

type Actions = ReturnType<
  | typeof ContactsActions.GET_CONTACTS.SUCCESS.create
  | typeof ContactsActions.SYNC_CONTACTS.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  search: {active: false},
  contacts: [],
  numberOfSyncedContacts: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ContactsActions.GET_CONTACTS.SUCCESS.type: {
        draft.contacts = action.payload.contacts;
        break;
      }
      case ContactsActions.SYNC_CONTACTS.SUCCESS.type: {
        draft.numberOfSyncedContacts = action.payload.numberOfSyncedContacts;
        break;
      }
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {...INITIAL_STATE};
      }
    }
  });
}

export const contactsReducer = persistReducer(
  {
    key: 'contacts',
    storage: AsyncStorage,
    whitelist: ['numberOfSyncedContacts'],
  },
  reducer,
);
