// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {KycStep} from '@api/tokenomics/types';
import {User} from '@api/user/types';

type Params = {
  userId: string;
  skipKYCSteps: KycStep[];
};

export function tryResetKYCSteps({userId, skipKYCSteps}: Params) {
  const params = skipKYCSteps.map(step => `skipKYCSteps=${step}`).join('&');
  return post<null, User>(
    `/kyc/tryResetKYCSteps/users/${userId}?${params}`,
    null,
  );
}
