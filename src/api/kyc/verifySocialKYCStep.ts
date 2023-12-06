// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {SocialKycStepNumber} from '@api/tokenomics/types';
import {SupportedLocale} from '@translations/localeConfig';

export type SocialMethod = 'facebook' | 'twitter';

type SocialKycData = {
  expectedPostText: string;
  remainingAttempts: number;
  result: 'SUCCESS' | 'FAILURE';
};

type Params = {
  userId: string;
  language: SupportedLocale;
  kycStep: SocialKycStepNumber;
  social: SocialMethod;
  link?: string;
  accessToken?: string;
};

export function verifySocialKYCStep({
  userId,
  language,
  kycStep,
  social,
  link,
  accessToken,
}: Params) {
  if (link) {
    return post<{twitter: {tweetUrl: string}}, SocialKycData>(
      `/kyc/verifySocialKYCStep/users/${userId}?verify=true&language=${language}&kycStep=${kycStep}&social=${social}`,
      {
        twitter: {
          tweetUrl: link,
        },
      },
    );
  }
  if (accessToken) {
    return post<{facebook: {accessToken: string}}, SocialKycData>(
      `/kyc/verifySocialKYCStep?language=${language}&kycStep=${kycStep}&social=${social}`,
      {
        facebook: {
          accessToken,
        },
      },
    );
  }
  return post<{}, SocialKycData>(
    `/kyc/verifySocialKYCStep/users/${userId}?language=${language}&kycStep=${kycStep}&social=${social}`,
    {},
  );
}
