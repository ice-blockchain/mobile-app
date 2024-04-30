// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';

type Params = {
  deviceUniqueId: string;
  email: string;
  language: string;
};

export function sendSignInLinkToEmail(params: Params) {
  return post<Params, {loginSession: string}>(
    '/auth/sendSignInLinkToEmail',
    params,
  );
}
