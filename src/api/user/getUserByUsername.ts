// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {UserProfile} from '@api/user/types';

/**
 * Returns public information about an user account
 * based on an username, making sure the username is valid first.
 */

export function getUserByUsername(username: string) {
  return get<UserProfile>(`/user-views/${username}`);
}
