// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {ValidationActions} from '@store/modules/Validation/actions';
import produce from 'immer';

export interface State {
  username: string | null;
  refUser: User | null;
  usernameValidationError: string | null;
  refUsernameValidationError: string | null;
  phoneVerificationStep: 'phone' | 'code';
}

type Actions = ReturnType<
  | typeof ValidationActions.USERNAME_VALIDATION.SUCCESS.create
  | typeof ValidationActions.USERNAME_VALIDATION.FAILED.create
  | typeof ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create
  | typeof ValidationActions.REF_USERNAME_VALIDATION.FAILED.create
  | typeof ValidationActions.RESET_VALIDATION_ERRORS.STATE.create
  | typeof AuthActions.UPDATE_ACCOUNT.SUCCESS.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  username: null,
  refUser: null,
  usernameValidationError: null,
  refUsernameValidationError: null,
  phoneVerificationStep: 'phone',
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ValidationActions.USERNAME_VALIDATION.SUCCESS.type:
        draft.username = action.payload.username;
        break;
      case ValidationActions.USERNAME_VALIDATION.FAILED.type:
        draft.usernameValidationError = action.payload.errorMessage;
        break;
      case ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.type:
        draft.refUser = action.payload.refUser;
        break;
      case ValidationActions.RESET_VALIDATION_ERRORS.STATE.type:
        draft.usernameValidationError = null;
        draft.refUsernameValidationError = null;
        break;
      case ValidationActions.REF_USERNAME_VALIDATION.FAILED.type:
        draft.refUsernameValidationError = action.payload.errorMessage;
        break;
      case AuthActions.UPDATE_ACCOUNT.SUCCESS.type:
        if (action.payload.result.phoneNumber) {
          draft.phoneVerificationStep = 'code';
        }
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export const validationReducer = reducer;
