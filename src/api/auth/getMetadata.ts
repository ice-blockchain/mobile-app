// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';

type Response = {
  userId: string;
  metadata: string;
};

export function getMetadata() {
  return post<null, Response>('auth/getMetadata', null);
}
