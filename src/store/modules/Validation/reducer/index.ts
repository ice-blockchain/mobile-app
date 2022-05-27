// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';
import {persistReducer} from 'redux-persist';
import {AuthActions} from '../../Auth/actions';
import {ValidationActions} from '../actions';

export interface State {
  isUsernameValid: boolean | null;
}

type Actions = ReturnType<
  | typeof ValidationActions.USERNAME_VALIDATION.SUCCESS.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  isUsernameValid: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ValidationActions.USERNAME_VALIDATION.SUCCESS.type:
        draft.isUsernameValid = true;
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
  key: 'validation',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: ['usersInfo'],
};

export const validationReducer = persistReducer(persistConfig, reducer);
