// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthActions} from '@store/modules/Auth/actions';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export type ReferralHistory = {
  date: string;
  t1: number;
  t2: number;
};

export interface State {
  history: ReferralHistory[];
}

type Actions = ReturnType<
  | typeof ReferralsActions.GET_REFERRALS_HISTORY_BY_USER_ID.SUCCESS.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  history: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ReferralsActions.GET_REFERRALS_HISTORY_BY_USER_ID.SUCCESS.type:
        draft.history = action.payload.history;
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
  key: 'referrals',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: ['usersInfo'],
};

export const referralsReducer = persistReducer(persistConfig, reducer);
