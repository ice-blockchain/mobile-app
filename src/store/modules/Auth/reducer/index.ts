// SPDX-License-Identifier: BUSL-1.1

import {OAuthRedirectResult} from '@magic-ext/react-native-oauth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthActions} from '@store/modules/Auth/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export type UserDataType = {
  email: string | null | undefined;
  phoneNumber: string | null;
};
export interface AuthState {
  userData: UserDataType;
  // TODO:: remove when we have api
  usersInfo: {
    [k: string]:
      | {
          profileFilled: boolean;
          welcomeSeen: boolean;
        }
      | undefined;
  };
  isInitialized: boolean;
  signInSuccessed: boolean;
  socialLoginInfo: undefined | OAuthRedirectResult;
  token: string | null;
}

const actionCreatorStoreUserData = AuthActions.STORE_USER_DATA.STATE.create;

type Actions = ReturnType<
  | typeof actionCreatorStoreUserData
  | typeof AuthActions.STORE_CLAIM_NICKNAME_DONE.STATE.create
  | typeof AuthActions.STORE_WELCOME_SEEN.STATE.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof AuthActions.SIGN_IN_EMAIL.SUCCESS.create
  | typeof AuthActions.SIGN_IN_PHONE.SUCCESS.create
  | typeof AuthActions.SIGN_IN_SOCIAL.SUCCESS.create
  | typeof AuthActions.GET_TOKEN.SUCCESS.create
  | typeof AuthActions.STORE_TOKEN.STATE.create
>;

const INITIAL_STATE: AuthState = {
  userData: {
    email: null,
    phoneNumber: null,
  },
  usersInfo: {},
  isInitialized: true,
  signInSuccessed: false,
  socialLoginInfo: undefined,
  token: null,
};

function reducer(state = INITIAL_STATE, action: Actions): AuthState {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.GET_TOKEN.SUCCESS.type:
      case AuthActions.STORE_TOKEN.STATE.type:
        draft.token = action.payload.token;
        break;
      case AuthActions.SIGN_IN_SOCIAL.SUCCESS.type:
      case AuthActions.SIGN_IN_EMAIL.SUCCESS.type:
      case AuthActions.SIGN_IN_PHONE.SUCCESS.type:
      case AuthActions.STORE_USER_DATA.STATE.type:
        draft.userData = action.payload.result.authInfo;
        draft.signInSuccessed = action.payload.result.success;
        draft.socialLoginInfo = action.payload.result.socialLoginInfo;
        draft.isInitialized = false;
        break;
      case AuthActions.STORE_CLAIM_NICKNAME_DONE.STATE.type:
        if (draft.userData.email) {
          draft.usersInfo[draft.userData.email] = {
            profileFilled: true,
            welcomeSeen: false,
          };
        }
        if (draft.userData.phoneNumber) {
          draft.usersInfo[draft.userData.phoneNumber] = {
            profileFilled: true,
            welcomeSeen: false,
          };
        }
        break;
      case AuthActions.STORE_WELCOME_SEEN.STATE.type:
        if (draft.userData.email) {
          draft.usersInfo[draft.userData.email] = {
            profileFilled: true,
            welcomeSeen: true,
          };
        }
        if (draft.userData.phoneNumber) {
          draft.usersInfo[draft.userData.phoneNumber] = {
            profileFilled: true,
            welcomeSeen: true,
          };
        }
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
          usersInfo: draft.usersInfo,
          isInitialized: false,
        };
      }
    }
  });
}

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  timeout: 120000,
  blacklist: ['isInitialized'],
};

export const authReducer = persistReducer(persistConfig, reducer);
