// SPDX-License-Identifier: ice License 1.0

import {startOrContinueQuiz} from '@api/kyc/startOrContinueQuiz';
import {verifySocialKYCStep} from '@api/kyc/verifySocialKYCStep';

export const kyc = Object.freeze({
  startOrContinueQuiz,
  verifySocialKYCStep,
});
