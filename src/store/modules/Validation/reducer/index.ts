// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthActions} from '@store/modules/Auth/actions';
import {ValidationActions} from '@store/modules/Validation/actions';
import produce from 'immer';
import {isEmpty} from 'lodash';
import {persistReducer} from 'redux-persist';

export interface State {
  isUsernameValid: boolean | null;
  username: string | null;
  refUsername: string | null;
  usernameValidationError: string | null;
  refUsernameValidationError: string | null;
}

type Actions = ReturnType<
  | typeof ValidationActions.USERNAME_VALIDATION.SUCCESS.create
  | typeof ValidationActions.USERNAME_VALIDATION.FAILED.create
  | typeof ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create
  | typeof ValidationActions.REF_USERNAME_VALIDATION.FAILED.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  isUsernameValid: null,
  username: null,
  refUsername: null,
  usernameValidationError: null,
  refUsernameValidationError: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ValidationActions.USERNAME_VALIDATION.SUCCESS.type:
        draft.isUsernameValid = true;
        draft.username = isEmpty(action.payload.username)
          ? null
          : action.payload.username;
        break;
      case ValidationActions.USERNAME_VALIDATION.FAILED.type:
        draft.usernameValidationError = action.payload.errorMessage;
        break;
      case ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.type:
        draft.refUsername = isEmpty(action.payload.refUsername)
          ? null
          : action.payload.refUsername;
        break;
      case ValidationActions.REF_USERNAME_VALIDATION.FAILED.type:
        draft.refUsernameValidationError = action.payload.errorMessage;
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
