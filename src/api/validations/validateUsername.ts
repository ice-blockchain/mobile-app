// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';

interface Params {
  username: string;
}

export function validateUsername({username}: Params) {
  return get(`/user-views/${username}`);
}
