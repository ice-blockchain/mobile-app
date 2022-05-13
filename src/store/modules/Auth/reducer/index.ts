// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';
import {persistReducer} from 'redux-persist';
import AuthActions from '../actions';

export interface State {
  userData: {
    email: string | null;
    // isMfaEnabled: boolean;
    // issuer: string;
    // phoneNumber: string | null;
    // publicAddress: string;
  };
  usersInfo: {
    [k: string]:
      | {
          profileFilled: boolean;
          welcomeSeen: boolean;
        }
      | undefined;
  };
  initialization: boolean;
}

const actionCreatorStoreUserData = AuthActions.STORE_USER_DATA.STATE.create;

type Actions = ReturnType<
  | typeof actionCreatorStoreUserData
  | typeof AuthActions.STORE_CLAIM_NICKNAME_DONE.STATE.create
  | typeof AuthActions.STORE_WELCOME_SEEN.STATE.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  userData: {
    email: null,
    // isMfaEnabled: false,
    // issuer: '',
    // phoneNumber: null,
    // publicAddress: '',
  },
  usersInfo: {},
  initialization: true,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.STORE_USER_DATA.STATE.type:
        console.log('STORE_USER_DATA.STATE');

        draft.userData = action.payload.data;
        draft.initialization = false;
        break;
      case AuthActions.STORE_CLAIM_NICKNAME_DONE.STATE.type:
        console.log('STORE_CLAIM_NICKNAME_DONE.STATE');

        draft.usersInfo[draft.userData.email!] = {
          profileFilled: true,
          welcomeSeen: false,
        };
        break;
      case AuthActions.STORE_WELCOME_SEEN.STATE.type:
        console.log('STORE_WELCOME_SEEN.STATE');

        draft.usersInfo[draft.userData.email!] = {
          profileFilled: true,
          welcomeSeen: true,
        };
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
          usersInfo: draft.usersInfo,
          initialization: false,
        };
      }
    }
  });
}

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: ['usersInfo'],
};

export default persistReducer(persistConfig, reducer);
