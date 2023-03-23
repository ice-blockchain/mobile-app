// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {User} from '@api/user/types';

interface Params {
  username: string;
}

export function getUserByUsername({username}: Params) {
  return get<User>(`/user-views/username?username=${username}`);
}
