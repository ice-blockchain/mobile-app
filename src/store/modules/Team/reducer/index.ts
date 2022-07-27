// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {TeamActions} from '@store/modules/Team/actions';
import produce from 'immer';
import {Contact} from 'react-native-contacts';

export interface State {
  iceUsers: User[];
  contacts: Contact[];
}

type Actions = ReturnType<
  | typeof TeamActions.GET_CONTACTS.SUCCESS.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof TeamActions.SEARCH_USERS.SUCCESS.create
>;

const INITIAL_STATE: State = {
  iceUsers: [],
  contacts: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case TeamActions.GET_CONTACTS.SUCCESS.type: {
        draft.contacts = action.payload.contacts;
        break;
      }
      case TeamActions.SEARCH_USERS.SUCCESS.type: {
        draft.iceUsers = action.payload.contacts;
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

export const teamReducer = reducer;
