// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {ContactsActions} from '@store/modules/Contacts/actions';
import produce from 'immer';
import {Contact} from 'react-native-contacts';

export interface State {
  search: {active: boolean};
  contacts: Contact[];
}

type Actions = ReturnType<
  | typeof ContactsActions.GET_CONTACTS.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  search: {active: false},
  contacts: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ContactsActions.GET_CONTACTS.SUCCESS.type: {
        draft.contacts = action.payload.contacts;
        break;
      }
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {...INITIAL_STATE};
      }
    }
  });
}

export const teamReducer = reducer;
