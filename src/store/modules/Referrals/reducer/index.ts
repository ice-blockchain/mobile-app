// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthActions} from '@store/modules/Auth/actions';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  referrals: {
    [userId: string]: {
      [key in ReferralType]?: {
        active: number;
        total: number;
        referrals: User[];
      };
    };
  };
}

type Actions = ReturnType<
  | typeof ReferralsActions.GET_REFERRALS.SUCCESS.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  referrals: {},
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ReferralsActions.GET_REFERRALS.SUCCESS.type:
        const {userId, referralType, offset, result} = action.payload;
        if (offset === 0) {
          draft.referrals[userId] = {
            ...state.referrals[userId],
            [referralType]: result,
          };
        } else {
          draft.referrals[userId] = {
            ...state.referrals[userId],
            [referralType]: {
              active: result.active,
              total: result.total,
              referrals: [
                ...(state.referrals[userId][referralType]?.referrals ?? []),
                ...result.referrals,
              ],
            },
          };
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

const persistConfig = {
  key: 'referrals',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: ['usersInfo'],
};

export const referralsReducer = persistReducer(persistConfig, reducer);
