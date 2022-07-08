// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthActions} from '@store/modules/Auth/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface AuthState {
  userData: {
    userId: string;
    email?: string | null;
    phoneNumber: string | null;
  } | null;
  token: string | null;
  isInitialized: boolean;
  isWelcomeSeen: boolean;
  phoneVerificationStep: string;
  isPhoneNumberVerified: boolean;
}

type Actions = ReturnType<
  | typeof AuthActions.SET_PHONE_NUMBER_VERIFIED.STATE.create
  | typeof AuthActions.SET_CODE_VERIFIED.STATE.create
  | typeof AuthActions.STORE_WELCOME_SEEN.STATE.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof AuthActions.SIGN_IN_EMAIL.SUCCESS.create
  | typeof AuthActions.SIGN_IN_PHONE.SUCCESS.create
  | typeof AuthActions.SIGN_IN_SOCIAL.SUCCESS.create
  | typeof AuthActions.LOAD_USER.STATE.create
>;

const INITIAL_STATE: AuthState = {
  userData: null,
  token: null,
  isInitialized: false,
  isWelcomeSeen: false,
  phoneVerificationStep: 'phone',
  isPhoneNumberVerified: false,
};

function reducer(state = INITIAL_STATE, action: Actions): AuthState {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.LOAD_USER.STATE.type:
        draft.userData = action.payload.userData ?? null;
        draft.token = action.payload.token ?? null;
        draft.isInitialized = true;
        break;
      case AuthActions.STORE_WELCOME_SEEN.STATE.type:
        draft.isWelcomeSeen = true;
        break;
      case AuthActions.SIGN_IN_SOCIAL.SUCCESS.type:
      case AuthActions.SIGN_IN_EMAIL.SUCCESS.type:
      case AuthActions.SIGN_IN_PHONE.SUCCESS.type:
        draft.userData = action.payload.result.userData;
        draft.token = action.payload.result.token;
        break;
      case AuthActions.SET_PHONE_NUMBER_VERIFIED.STATE.type:
        if (draft.userData) {
          draft.userData.phoneNumber = action.payload.phone;
        }
        draft.phoneVerificationStep = 'code';
        break;
      case AuthActions.SET_CODE_VERIFIED.STATE.type:
        draft.isPhoneNumberVerified = true;
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
  whitelist: ['isWelcomeSeen', 'isPhoneNumberVerified', 'userData'],
};

export const authReducer = persistReducer(persistConfig, reducer);
