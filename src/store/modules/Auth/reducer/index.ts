// SPDX-License-Identifier: BUSL-1.1

import produce from 'immer';
import AuthActions from '../actions';

export interface State {
  userData: {
    email: string;
    isMfaEnabled: boolean;
    issuer: string;
    phoneNumber: string | null;
    publicAddress: string;
  };
}

const actionCreatorStoreUserData = AuthActions.STORE_USER_DATA.STATE.create;

type Actions = ReturnType<typeof actionCreatorStoreUserData>;

const INITIAL_STATE: State = {
  userData: {
    email: '',
    isMfaEnabled: false,
    issuer: '',
    phoneNumber: null,
    publicAddress: '',
  },
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.STORE_USER_DATA.STATE.type:
        draft.userData = action.payload.data;
        break;
      // TODO: connect log out
      // case AuthActions.SIGN_OUT.SUCCESS.type: {
      //   return INITIAL_STATE;
      // }
    }
  });
}

export default reducer;
