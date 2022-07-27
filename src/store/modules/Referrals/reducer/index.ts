// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import produce from 'immer';

export interface State {
  data: {
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
  data: {},
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ReferralsActions.GET_REFERRALS.SUCCESS.type:
        const {userId, referralType, offset, result} = action.payload;
        if (offset === 0) {
          draft.data[userId] = {
            ...state.data[userId],
            [referralType]: result,
          };
        } else {
          draft.data[userId] = {
            ...state.data[userId],
            [referralType]: {
              active: result.active,
              total: result.total,
              referrals: [
                ...(state.data[userId][referralType]?.referrals ?? []),
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

export const referralsReducer = reducer;
