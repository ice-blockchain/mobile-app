// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';

type Params = {
  loginSession: string;
};

type Response = {
  refreshToken: string;
  accessToken: string;
};

export function getSignInWithEmailLinkStatus(params: Params) {
  return post<Params, Response>('auth/getSignInWithEmailLinkStatus', params);
}
