// SPDX-License-Identifier: BUSL-1.1

import produce from 'immer';
import UsersActions from '../actions';

export interface State {
  isUsernameValid: boolean;
}

const actionCreatorNewsLoad = UsersActions.USERNAME_VALIDATION.SUCCESS.create;
const actionCreatorFailedNewsLoad =
  UsersActions.USERNAME_VALIDATION.FAILED.create;

type Actions =
  | ReturnType<typeof actionCreatorNewsLoad>
  | ReturnType<typeof actionCreatorFailedNewsLoad>;

const INITIAL_STATE: State = {
  isUsernameValid: true,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case UsersActions.USERNAME_VALIDATION.SUCCESS.type:
        draft.isUsernameValid = true;
        break;
      // TODO: connect log out
      // case AuthActions.SIGN_OUT.SUCCESS.type: {
      //   return INITIAL_STATE;
      // }
    }
  });
}

export default reducer;
