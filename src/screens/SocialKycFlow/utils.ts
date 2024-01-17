// SPDX-License-Identifier: ice License 1.0

import {VERIFY_SOCIAL_ACCOUNT_KYC_STEP} from '@api/tokenomics/constants';
import {SocialKycStepNumber} from '@api/tokenomics/types';

export function kycStepToTranslationsPathPrefix(kycStep: SocialKycStepNumber) {
  switch (kycStep) {
    case 3: {
      return 'social_kyc';
    }
    case 5: {
      return 'distribution_kyc';
    }
    default: {
      return 'distribution_kyc_dynamic';
    }
  }
}

export function isDistributionKyc(kycStep: SocialKycStepNumber): boolean {
  return kycStep !== VERIFY_SOCIAL_ACCOUNT_KYC_STEP;
}
