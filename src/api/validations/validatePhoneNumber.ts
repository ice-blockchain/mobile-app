// SPDX-License-Identifier: ice License 1.0

import {put} from '@api/client';
import {User} from '@api/user/types';

interface Params {
  userId: string;
  phoneNumber: string;
  phoneNumberHash: string;
  validationCode: string;
}

/**
 * Validates a provided phone number by a one time code
 * previously provided to the user via SMS.
 */

export function validatePhoneNumber({
  userId,
  phoneNumber,
  phoneNumberHash,
  validationCode,
}: Params) {
  return put<Params, User>(`/user-validations/${userId}/phone-number`, {
    userId,
    phoneNumber,
    phoneNumberHash,
    validationCode,
  });
}
