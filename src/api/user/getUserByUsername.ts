// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {UserProfile} from '@api/user/types';

interface Params {
  username: string;
}

export function getUserByUsername({username}: Params) {
  return get<UserProfile>(`/user-views/username?username=${username}`);
}
