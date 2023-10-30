// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {SocialKycStepNumber} from '@api/tokenomics/types';
import {SupportedLocale} from '@translations/localeConfig';

export type SocialMethod = 'facebook' | 'twitter';

type SocialKycData = {
  expectedPostText: string;
  remainingAttempts: number;
  result: 'SUCCESS';
};

type Params = {
  language: SupportedLocale;
  kycStep: SocialKycStepNumber;
  social: SocialMethod;
  link?: string;
};

export function verifySocialKYCStep({language, kycStep, social, link}: Params) {
  if (link) {
    return post<{link: string}, SocialKycData>(
      `/kyc/verifySocialKYCStep?language=${language}&kycStep=${kycStep}&social=${social}`,
      {
        link,
      },
    );
  }
  return post<{}, SocialKycData>(
    `/kyc/verifySocialKYCStep?language=${language}&kycStep=${kycStep}&social=${social}`,
    {},
  );
}
