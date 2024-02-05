// SPDX-License-Identifier: ice License 1.0

import {FeatureToggleConfig} from '@api/auth/types';
import {User} from '@api/user/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignInUserInfo} from '@services/auth/signin/types';
import {AuthToken} from '@services/auth/types';
import {AccountActions} from '@store/modules/Account/actions';
import {QuizActions} from '@store/modules/Quiz/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface AccountState {
  isAdmin: boolean | null;
  token: AuthToken | null;
  metadata: string | null;
  user: User | null;
  // data that is taken from the auth providers (google / apple etc)
  // and used to populate / suggest User profile later on
  userInfo: SignInUserInfo | null;
  installReferrer: string | null;
  isPrivacyInfoShown: boolean;
  bscAddrWarningConfirmed: boolean;
  authConfig: FeatureToggleConfig | null;
}

type Actions = ReturnType<
  | typeof AccountActions.SET_TOKEN.STATE.create
  | typeof AccountActions.SET_USER_METADATA.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof AccountActions.SIGN_IN_SOCIAL.SUCCESS.create
  | typeof AccountActions.USER_STATE_CHANGE.SUCCESS.create
  | typeof AccountActions.UPDATE_ACCOUNT.SUCCESS.create
  | typeof AccountActions.GET_ACCOUNT.SUCCESS.create
  | typeof AccountActions.SET_PRIVACY_INFO_SHOW.STATE.create
  | typeof AccountActions.GET_AUTH_CONFIG.SUCCESS.create
  | typeof AccountActions.SET_INSTALL_REFERRER.STATE.create
  | typeof AccountActions.SET_BSC_ADDR_WARNING_CONFIRMED.STATE.create
  | typeof QuizActions.RESET_QUIZ_KYC_STEP.SUCCESS.create
>;

const INITIAL_STATE: AccountState = {
  isAdmin: null,
  token: null,
  metadata: null,
  user: null,
  userInfo: null,
  installReferrer: null,
  isPrivacyInfoShown: true,
  authConfig: null,
  bscAddrWarningConfirmed: false,
};

function reducer(state = INITIAL_STATE, action: Actions): AccountState {
  return produce(state, draft => {
    switch (action.type) {
      case AccountActions.SET_TOKEN.STATE.type:
        draft.token = action.payload.token;
        break;
      case AccountActions.SET_USER_METADATA.STATE.type:
        draft.metadata = action.payload.metadata;
        break;
      case AccountActions.USER_STATE_CHANGE.SUCCESS.type:
      case AccountActions.GET_ACCOUNT.SUCCESS.type:
      case AccountActions.UPDATE_ACCOUNT.SUCCESS.type:
      case QuizActions.RESET_QUIZ_KYC_STEP.SUCCESS.type:
        draft.user = action.payload.user;
        if (action.type === AccountActions.USER_STATE_CHANGE.SUCCESS.type) {
          draft.isAdmin = action.payload.isAdmin;
        }
        break;
      case AccountActions.SIGN_IN_SOCIAL.SUCCESS.type:
        draft.userInfo = action.payload.userInfo;
        break;
      case AccountActions.SET_PRIVACY_INFO_SHOW.STATE.type:
        draft.isPrivacyInfoShown = action.payload.isPrivacyInfoShown;
        break;
      case AccountActions.GET_AUTH_CONFIG.SUCCESS.type:
        draft.authConfig = action.payload.config;
        break;
      case AccountActions.SET_INSTALL_REFERRER.STATE.type:
        draft.installReferrer = action.payload.installReferrer;
        break;
      case AccountActions.SET_BSC_ADDR_WARNING_CONFIRMED.STATE.type:
        draft.bscAddrWarningConfirmed = true;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
          authConfig: state.authConfig,
        };
      }
    }
  });
}

export const accountReducer = persistReducer(
  {
    key: 'account',
    storage: AsyncStorage,
    whitelist: ['installReferrer', 'bscAddrWarningConfirmed'],
  },
  reducer,
);
