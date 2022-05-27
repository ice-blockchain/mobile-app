// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';

interface Params {
  phoneNumber: string;
  validationCode: string;
}

export function phoneValidation({phoneNumber, validationCode}: Params) {
  return put('/user-validations/phone-number', {
    phoneNumber,
    validationCode,
  });
}
