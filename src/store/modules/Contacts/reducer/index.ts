// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {CONTACTS_PHONE_NUMBERS_DIVIDER} from '@store/modules/Contacts/sagas/syncContactsSaga';
import produce from 'immer';
import {Contact} from 'react-native-contacts';
import {persistReducer} from 'redux-persist';

export interface State {
  search: {active: boolean};
  contacts: Contact[];
  syncedContactsPhoneNumbers: string | null;
}

type Actions = ReturnType<
  | typeof ContactsActions.GET_CONTACTS.SUCCESS.create
  | typeof ContactsActions.SYNC_CONTACTS.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  search: {active: false},
  contacts: [],
  syncedContactsPhoneNumbers: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ContactsActions.GET_CONTACTS.SUCCESS.type: {
        draft.contacts = action.payload.contacts;
        break;
      }
      case ContactsActions.SYNC_CONTACTS.SUCCESS.type: {
        draft.syncedContactsPhoneNumbers = state.syncedContactsPhoneNumbers
          ? state.syncedContactsPhoneNumbers +
            CONTACTS_PHONE_NUMBERS_DIVIDER +
            action.payload.syncedContactsPhoneNumbers
          : action.payload.syncedContactsPhoneNumbers;
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
    whitelist: ['syncedContactsPhoneNumbers'],
  },
  reducer,
);
