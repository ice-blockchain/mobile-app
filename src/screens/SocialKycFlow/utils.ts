// SPDX-License-Identifier: ice License 1.0

import {SocialKycMethod} from '@store/modules/SocialKyc/types';

export function getTranslationsSocialKycMethod(
  socialKycMethod: SocialKycMethod,
) {
  return socialKycMethod === 'X' ? 'x' : 'fb';
}
