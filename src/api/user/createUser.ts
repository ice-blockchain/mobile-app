// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {User} from '@api/user/types';
import {DeepPartial} from 'redux';

export function createUser(user: DeepPartial<User>) {
  return post<DeepPartial<User>, User>('/users', user);
}
