// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';

interface Params {
  username: string;
}

export function usernameValidation({username}: Params) {
  return put('/user-validations/username', {
    username,
  });
}
