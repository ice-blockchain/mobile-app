// SPDX-License-Identifier: ice License 1.0

import {SocialKycStepNumber} from '@api/tokenomics/types';

export function kycStepToTranslationsPathPrefix(kycStep: SocialKycStepNumber) {
  switch (kycStep) {
    case 3: {
      return 'social_kyc';
    }
    case 5: {
      return 'distribution_kyc';
    }
  }
}
