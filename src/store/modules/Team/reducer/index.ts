// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthActions} from '@store/modules/Auth/actions';
import {TeamActions} from '@store/modules/Team/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  isPhoneNumberVerified: boolean;
}

type Actions = ReturnType<
  | typeof TeamActions.SET_PHONE_NUMBER_VERIFIED.STATE.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  isPhoneNumberVerified: false,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case TeamActions.SET_PHONE_NUMBER_VERIFIED.STATE.type: {
        draft.isPhoneNumberVerified = true;
        break;
      }
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

const persistConfig = {
  key: 'team',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: ['isPhoneNumberVerified'],
};

export const teamReducer = persistReducer(persistConfig, reducer);
