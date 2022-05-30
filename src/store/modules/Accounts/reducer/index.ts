// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Accounts/actions';
import {AuthActions} from '@store/modules/Auth/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  email: string;
  fullName: string;
  phoneNumber: string;
  referredBy: string;
  username: string;
}

type Actions = ReturnType<
  | typeof AccountActions.CREATE_USER.SUCCESS.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  email: '',
  fullName: '',
  phoneNumber: '',
  referredBy: '',
  username: '',
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case AccountActions.CREATE_USER.SUCCESS.type:
        draft.email = action.payload.email;
        draft.fullName = action.payload.fullName;
        draft.phoneNumber = action.payload.phoneNumber;
        draft.referredBy = action.payload.referredBy;
        draft.username = action.payload.username;
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

const persistConfig = {
  key: 'account',
  storage: AsyncStorage,
  timeout: 120000,
};

export const accountReducer = persistReducer(persistConfig, reducer);
