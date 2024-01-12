// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {UsersActions} from '@store/modules/Users/actions';
import {produce} from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  entities: {[userId: string]: User};
  error: string | null;
  onboardingIds: string[];
  migrationAgreementIds: string[];
}

type Actions = ReturnType<
  | typeof UsersActions.GET_USER_BY_ID.SUCCESS.create
  | typeof UsersActions.GET_USER_BY_ID.FAILED.create
  | typeof UsersActions.UPDATE_VIEWED_ONBOARDINGS.STATE.create
  | typeof UsersActions.UPDATE_VIEWED_MIGRATION_AGREEMENT.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  entities: {},
  error: null,
  onboardingIds: [],
  migrationAgreementIds: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case UsersActions.GET_USER_BY_ID.SUCCESS.type:
        const {user} = action.payload;
        draft.entities = {...state.entities, ...{[user.id]: user}};
        break;

      case UsersActions.GET_USER_BY_ID.FAILED.type:
        const {errorMessage} = action.payload;
        draft.error = errorMessage;
        break;

      case UsersActions.UPDATE_VIEWED_ONBOARDINGS.STATE.type:
        const {userId} = action.payload;
        if (!state.onboardingIds.includes(userId)) {
          draft.onboardingIds = [...state.onboardingIds, userId];
        }
        break;

      case UsersActions.UPDATE_VIEWED_MIGRATION_AGREEMENT.STATE.type:
        const {migrationUserId} = action.payload;
        if (!state.migrationAgreementIds.includes(migrationUserId)) {
          draft.migrationAgreementIds = [
            ...state.migrationAgreementIds,
            migrationUserId,
          ];
        }
        break;

      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
          onboardingIds: state.onboardingIds,
        };
      }
    }
  });
}

export const usersReducer = persistReducer(
  {
    key: 'users',
    storage: AsyncStorage,
    whitelist: ['onboardingIds', 'migrationAgreementIds'],
  },
  reducer,
);
