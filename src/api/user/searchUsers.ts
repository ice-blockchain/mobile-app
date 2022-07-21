// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {getHeaders} from '@api/client/getHeaders';
import {RelatableUserProfile} from '@api/referrals/types';

/**
 * Returns a list of user account based on the provided query parameters.
 */

export async function searchUsers(query: String, signal?: AbortSignal) {
  return get<[RelatableUserProfile]>(`/users?keyword=${query}`, {
    signal: signal,
    headers: getHeaders(),
  });
}
