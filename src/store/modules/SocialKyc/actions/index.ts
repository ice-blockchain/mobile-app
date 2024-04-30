// SPDX-License-Identifier: ice License 1.0

import {SocialKycStepNumber} from '@api/tokenomics/types';
import {SocialKycMethod} from '@store/modules/SocialKyc/types';
import {createAction} from '@store/utils/actions/createAction';

const SOCIAL_KYC_VERIFICATION = createAction('SOCIAL_KYC_VERIFICATION', {
  START: (payload: {
    socialKycMethod: SocialKycMethod;
    kycStep: SocialKycStepNumber;
    postUrl?: string;
    accessToken?: string;
  }) => {
    return payload;
  },
  SUCCESS: true,
  ERROR: (payload: {skippable?: boolean; message?: string}) => payload,
  FAILURE: (payload: {remainingAttempts: number}) => payload,
});

const GET_SOCIAL_KYC_REPOST_TEXT = createAction('GET_SOCIAL_KYC_REPOST_TEXT', {
  START: (payload: {
    socialKycMethod: SocialKycMethod;
    kycStep: SocialKycStepNumber;
  }) => payload,
  SUCCESS: (payload: {repostText: string}) => payload,
  ERROR: (payload: {skippable?: boolean}) => payload,
});

const RESET_SOCIAL_KYC_STATUS = createAction('RESET_SOCIAL_KYC_STATUS', {
  STATE: true,
});

export const SocialKycActions = Object.freeze({
  SOCIAL_KYC_VERIFICATION,
  GET_SOCIAL_KYC_REPOST_TEXT,
  RESET_SOCIAL_KYC_STATUS,
});
