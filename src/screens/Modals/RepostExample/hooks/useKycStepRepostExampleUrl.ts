// SPDX-License-Identifier: ice License 1.0

import {
  DISTRIBUTION_KYC_STEP,
  VERIFY_SOCIAL_ACCOUNT_KYC_STEP,
} from '@api/tokenomics/constants';
import {SocialKycStepNumber} from '@api/tokenomics/types';
import {LINKS} from '@constants/links';
import {dynamicDistributionDataSelector} from '@store/modules/Account/selectors';
import {useSelector} from 'react-redux';

export function useKycStepRepostExampleUrl(kycStep: SocialKycStepNumber) {
  const dynamicDistributionData = useSelector(dynamicDistributionDataSelector);

  switch (kycStep) {
    case VERIFY_SOCIAL_ACCOUNT_KYC_STEP: {
      return LINKS.X_REPOST_EXAMPLE;
    }
    case DISTRIBUTION_KYC_STEP: {
      return LINKS.DIST_REPOST_EXAMPLE;
    }
  }
  return (
    dynamicDistributionData?.find(data => data.step === kycStep)
      ?.xPostExample ?? LINKS.DIST_REPOST_EXAMPLE
  );
}
