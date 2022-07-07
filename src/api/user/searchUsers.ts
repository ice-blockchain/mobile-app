// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {RelatableUserProfile} from '@api/user/types';

/**
 * Returns a list of user account based on the provided query parameters.
 */

export function searchUsers(query: String) {
  return get<[RelatableUserProfile]>(`/users?keyword=${query}`);
}
