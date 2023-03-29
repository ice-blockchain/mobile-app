// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {SignInUserInfo} from '@services/auth/signin/types';
import {AccountActions} from '@store/modules/Account/actions';
import produce from 'immer';

export interface AccountState {
  isAdmin: boolean | null;
  token: string | null;
  user: User | null;
  // data that is taken from the auth providers (google / apple etc)
  // and used to populate / suggest User profile later on
  userInfo: SignInUserInfo | null;
  isPrivacyInfoShown: boolean;
}

type Actions = ReturnType<
  | typeof AccountActions.SET_TOKEN.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof AccountActions.SIGN_IN_SOCIAL.SUCCESS.create
  | typeof AccountActions.USER_STATE_CHANGE.SUCCESS.create
  | typeof AccountActions.USER_STATE_CHANGE.FAILED.create
  | typeof AccountActions.UPDATE_ACCOUNT.SUCCESS.create
  | typeof AccountActions.GET_ACCOUNT.SUCCESS.create
  | typeof AccountActions.SET_PRIVACY_INFO_SHOW.STATE.create
>;

const INITIAL_STATE: AccountState = {
  isAdmin: null,
  token: null,
  user: null,
  userInfo: null,
  isPrivacyInfoShown: true,
};

function reducer(state = INITIAL_STATE, action: Actions): AccountState {
  return produce(state, draft => {
    switch (action.type) {
      case AccountActions.SET_TOKEN.STATE.type:
        draft.token = action.payload.token;
        break;
      case AccountActions.USER_STATE_CHANGE.SUCCESS.type:
        draft.user = action.payload.user;
        draft.isAdmin = action.payload.isAdmin;
        break;
      case AccountActions.GET_ACCOUNT.SUCCESS.type:
      case AccountActions.UPDATE_ACCOUNT.SUCCESS.type:
        if (action.payload.user) {
          draft.user = {...draft.user, ...action.payload.user};
        }
        break;
      case AccountActions.SIGN_IN_SOCIAL.SUCCESS.type:
        draft.userInfo = action.payload.userInfo;
        break;
      case AccountActions.SET_PRIVACY_INFO_SHOW.STATE.type:
        draft.isPrivacyInfoShown = action.payload.isPrivacyInfoShown;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export const accountReducer = reducer;
