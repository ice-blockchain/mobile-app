// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {User} from '@api/user/types';

/**
 * Returns a list of user account based on the provided query parameters.
 */

type Params = {
  query: string;
  limit?: number;
  offset?: number;
};

export async function searchUsers({query, limit = 10, offset = 0}: Params) {
  return get<User[]>('/users', {
    keyword: encodeURIComponent(query),
    limit,
    offset,
  });
}
