// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  referredBy?: string;
  referredById?: string;
  authTracked?: boolean;
}

type Actions = ReturnType<
  | typeof AnalyticsActions.UPDATE_REFERRED_BY.SUCCESS.create
  | typeof AnalyticsActions.TRACK_SIGN_IN.SUCCESS.create
  | typeof AnalyticsActions.TRACK_SIGN_UP.START.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case AnalyticsActions.UPDATE_REFERRED_BY.SUCCESS.type:
        draft.referredBy = action.payload.referredBy;
        draft.referredById = action.payload.referredById;
        break;
      case AnalyticsActions.TRACK_SIGN_IN.SUCCESS.type:
      case AnalyticsActions.TRACK_SIGN_UP.START.type:
        draft.authTracked = true;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {...INITIAL_STATE};
    }
  });
}

export const analyticsReducer = persistReducer(
  {
    key: 'analytics',
    storage: AsyncStorage,
  },
  reducer,
);
