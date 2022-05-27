// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';

interface Params {
  userId: string;
}

export function getUserAccount({userId}: Params) {
  return get(`/users/${userId}`);
}
