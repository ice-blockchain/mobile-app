// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';

interface Params {
  username: string;
}

export default function getPublicInfoByUsername({username}: Params) {
  return get(`/user-views/username?${username}`);
}
