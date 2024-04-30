// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {
  GetSocialKycRepostTextStatus,
  SocialKycStatus,
} from '@store/modules/SocialKyc/types';
import produce from 'immer';

type Actions = ReturnType<
  | typeof SocialKycActions.SOCIAL_KYC_VERIFICATION.START.create
  | typeof SocialKycActions.SOCIAL_KYC_VERIFICATION.SUCCESS.create
  | typeof SocialKycActions.SOCIAL_KYC_VERIFICATION.FAILURE.create
  | typeof SocialKycActions.SOCIAL_KYC_VERIFICATION.ERROR.create
  | typeof SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.START.create
  | typeof SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.SUCCESS.create
  | typeof SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.ERROR.create
  | typeof SocialKycActions.RESET_SOCIAL_KYC_STATUS.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

export interface State {
  socialKycStatus: SocialKycStatus | null;
  socialKycErrorMessage: string | null;
  getSocialKycRepostTextStatus: GetSocialKycRepostTextStatus | null;
  remainingAttempts: number;
  repostText: string | null;
}

const INITIAL_STATE: State = {
  socialKycStatus: null,
  socialKycErrorMessage: null,
  getSocialKycRepostTextStatus: null,
  remainingAttempts: 0,
  repostText: null,
};

export function socialKycReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case SocialKycActions.SOCIAL_KYC_VERIFICATION.START.type:
        draft.socialKycStatus = 'LOADING';
        draft.socialKycErrorMessage = null;
        break;
      case SocialKycActions.SOCIAL_KYC_VERIFICATION.SUCCESS.type:
        draft.socialKycStatus = 'SUCCESS';
        break;
      case SocialKycActions.SOCIAL_KYC_VERIFICATION.FAILURE.type:
        draft.remainingAttempts = action.payload.remainingAttempts;
        draft.socialKycStatus = 'FAILED';
        break;
      case SocialKycActions.SOCIAL_KYC_VERIFICATION.ERROR.type:
        draft.socialKycStatus = action.payload?.skippable
          ? 'SKIPPABLE_ERROR'
          : 'ERROR';
        draft.socialKycErrorMessage = action.payload?.message ?? null;
        break;
      case SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.START.type:
        draft.getSocialKycRepostTextStatus = 'LOADING';
        break;
      case SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.SUCCESS.type:
        draft.repostText = action.payload.repostText;
        draft.getSocialKycRepostTextStatus = 'SUCCESS';
        break;
      case SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.ERROR.type:
        draft.getSocialKycRepostTextStatus = 'ERROR';
        break;
      case SocialKycActions.RESET_SOCIAL_KYC_STATUS.STATE.type:
        return {...INITIAL_STATE, repostText: draft.repostText};
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {...INITIAL_STATE};
    }
  });
}
