// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {User} from '@api/user/types';

/**
 * Returns a list of user account based on the provided query parameters.
 */

export async function searchUsers(query: string = '') {
  return get<User[]>(`/users?keyword=${query}`);
}
