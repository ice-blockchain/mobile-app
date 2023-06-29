// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';

type Params = {
  refreshToken: string;
};

type Response = {
  refreshToken: string;
  accessToken: string;
};

export function refreshTokens(params: Params) {
  return post<{}, Response>('auth/refreshTokens', {}, undefined, {
    headers: {Authorization: `Bearer ${params.refreshToken}`},
  });
}
