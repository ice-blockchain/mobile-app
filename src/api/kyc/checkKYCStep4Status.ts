// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {QuizStatus} from '@api/kyc/types';

type Params = {
  userId: string;
};

export function checkKYCStep4Status({userId}: Params) {
  return post<null, QuizStatus>(
    `/kyc/checkKYCStep4Status/users/${userId}`,
    null,
  );
}
