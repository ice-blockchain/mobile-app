// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';

interface Params {
  userId: string;
}

export function pingUser({userId}: Params) {
  return post<undefined, unknown>(`/user-pings/${userId}`, undefined);
}
