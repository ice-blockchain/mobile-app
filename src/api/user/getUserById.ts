// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {UserProfile} from '@api/user/types';

/**
 * Returns an user's account.
 */

export function getUserById(userId: string) {
  return get<UserProfile>(`/users/${userId}`);
}
