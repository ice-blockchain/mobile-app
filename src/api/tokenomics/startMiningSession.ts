// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {
  FaceAuthKycNumber,
  MiningSummary,
  QuizKycStep,
  SocialKycStepNumber,
} from '@api/tokenomics/types';

interface Params {
  userId: string;
  resurrect?: boolean | null;
  skipKYCStep?: FaceAuthKycNumber | SocialKycStepNumber | QuizKycStep | null;
}

export function startMiningSession({userId, resurrect, skipKYCStep}: Params) {
  return post<
    {resurrect?: boolean | null; skipKYCSteps?: number[] | undefined},
    MiningSummary | null
  >(`/tokenomics/${userId}/mining-sessions`, {
    resurrect,
    skipKYCSteps: skipKYCStep != null ? [skipKYCStep] : undefined,
  });
}
