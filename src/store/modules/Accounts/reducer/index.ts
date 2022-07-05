// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Accounts/actions';
import {AuthActions} from '@store/modules/Auth/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface User {
  email: string | null | undefined;
  fullName: string;
  phoneNumber: string | null | undefined;
  referredBy: string;
  username: string;
}

export interface State {
  user: User;
  phoneVerificationStep: 'phone' | 'code';
  isPhoneNumberVerified: boolean;
}

type Actions = ReturnType<
  | typeof AccountActions.SET_PHONE_NUMBER_VERIFIED.STATE.create
  | typeof AccountActions.SET_CODE_VERIFIED.STATE.create
  | typeof AccountActions.CREATE_USER.SUCCESS.create
  | typeof AccountActions.SET_USER.STATE.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  user: {
    email: '',
    fullName: '',
    phoneNumber: '',
    referredBy: '',
    username: '',
  },
  phoneVerificationStep: 'phone',
  isPhoneNumberVerified: false,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case AccountActions.CREATE_USER.SUCCESS.type:
        draft.user.email = action.payload.email;
        draft.user.fullName = action.payload.fullName;
        draft.user.phoneNumber = action.payload.phoneNumber;
        draft.user.referredBy = action.payload.referredBy;
        draft.user.username = action.payload.username;
        break;
      case AccountActions.SET_USER.STATE.type:
        draft.user.email = action.payload.result.email;
        draft.user.phoneNumber = action.payload.result.phoneNumber;
        break;
      case AccountActions.SET_PHONE_NUMBER_VERIFIED.STATE.type:
        draft.user.phoneNumber = action.payload.phone;
        draft.phoneVerificationStep = 'code';
        break;
      case AccountActions.SET_CODE_VERIFIED.STATE.type:
        draft.isPhoneNumberVerified = true;
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
  blacklist: ['phoneVerificationStep', 'isPhoneNumberVerified'],
};

export const accountReducer = persistReducer(persistConfig, reducer);
