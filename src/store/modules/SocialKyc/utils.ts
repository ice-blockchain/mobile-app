// SPDX-License-Identifier: ice License 1.0

import {SocialMethod} from '@api/kyc/verifySocialKYCStep';
import {SocialKycMethod, SocialKycStatus} from '@store/modules/SocialKyc/types';

export function isSocialKycFinalized(status: SocialKycStatus | null) {
  return status === 'SUCCESS' || status === 'FAILED';
}

export function socialKycMethodToApiSocialMethod(
  socialKycMethod: SocialKycMethod,
): SocialMethod {
  switch (socialKycMethod) {
    case 'Facebook':
      return 'facebook';
    case 'X':
      return 'twitter';
  }
}
