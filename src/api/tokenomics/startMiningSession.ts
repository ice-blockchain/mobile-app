// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {
  FaceAuthKycNumber,
  MiningSummary,
  SocialKycStepNumber,
} from '@api/tokenomics/types';

interface Params {
  userId: string;
  resurrect?: boolean | null;
  skipKYCStep?: FaceAuthKycNumber | SocialKycStepNumber | null;
}

export function startMiningSession({userId, resurrect, skipKYCStep}: Params) {
  return post<
    {resurrect?: boolean | null; skipKYCSteps?: number[] | undefined},
    MiningSummary | null
  >(`/tokenomics/${userId}/mining-sessions`, {
    resurrect,
    skipKYCSteps: skipKYCStep ? [skipKYCStep] : undefined,
  });
}
