// SPDX-License-Identifier: BUSL-1.1

import {UserProfile} from '@api/user/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthActions} from '@store/modules/Auth/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface AuthState {
  magicUser: {
    phoneNumber: string | null;
    userId: string;
    email?: string | null;
    username?: string | null;
  } | null;
  token: string | null;
  isInitialized: boolean;
  isWelcomeSeen: boolean;
  phoneVerificationStep: string;
  isPhoneNumberVerified: boolean;
  profile: UserProfile | null;
}

type Actions = ReturnType<
  | typeof AuthActions.SET_TOKEN.STATE.create
  | typeof AuthActions.SET_PHONE_NUMBER_VERIFIED.STATE.create
  | typeof AuthActions.SET_CODE_VERIFIED.STATE.create
  | typeof AuthActions.STORE_WELCOME_SEEN.STATE.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof AuthActions.SIGN_IN_EMAIL.SUCCESS.create
  | typeof AuthActions.SIGN_IN_PHONE.SUCCESS.create
  | typeof AuthActions.SIGN_IN_SOCIAL.SUCCESS.create
  | typeof AuthActions.LOAD_USER.STATE.create
  | typeof AuthActions.CREATE_USER.SUCCESS.create
  | typeof AuthActions.CREATE_USER.FAILED.create
  | typeof AuthActions.FETCH_USER_PROFILE.SUCCESS.create
>;

const INITIAL_STATE: AuthState = {
  magicUser: null,
  token: null,
  isInitialized: false,
  isWelcomeSeen: false,
  phoneVerificationStep: 'phone',
  isPhoneNumberVerified: false,
  profile: null,
};

function reducer(state = INITIAL_STATE, action: Actions): AuthState {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.SET_TOKEN.STATE.type:
        draft.token = action.payload.token;
        break;
      case AuthActions.LOAD_USER.STATE.type:
        draft.magicUser = action.payload.magicUser ?? null;
        draft.isInitialized = true;
        draft.profile = action.payload.profile ?? null;
        break;
      case AuthActions.STORE_WELCOME_SEEN.STATE.type:
        draft.isWelcomeSeen = true;
        break;
      case AuthActions.SIGN_IN_SOCIAL.SUCCESS.type:
      case AuthActions.SIGN_IN_EMAIL.SUCCESS.type:
      case AuthActions.SIGN_IN_PHONE.SUCCESS.type:
        draft.magicUser = action.payload.result.magicUser;
        draft.profile = action.payload.result.profile ?? null;
        break;
      case AuthActions.SET_PHONE_NUMBER_VERIFIED.STATE.type:
        if (draft.magicUser) {
          draft.magicUser.phoneNumber = action.payload.phone;
        }
        draft.phoneVerificationStep = 'code';
        break;
      case AuthActions.SET_CODE_VERIFIED.STATE.type:
        draft.isPhoneNumberVerified = true;
        break;
      case AuthActions.CREATE_USER.SUCCESS.type:
      case AuthActions.FETCH_USER_PROFILE.SUCCESS.type:
        draft.profile = action.payload.result ?? null;
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
          isInitialized: true,
          welcomeSeen: true,
        };
      }
    }
  });
}

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: ['isWelcomeSeen', 'isPhoneNumberVerified', 'magicUser', 'profile'],
};

export const authReducer = persistReducer(persistConfig, reducer);
