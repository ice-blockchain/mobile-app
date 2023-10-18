// SPDX-License-Identifier: ice License 1.0

import {AuthConfig} from '@api/auth/types';
import {get} from '@api/client';
import {NO_CACHE_HEADERS} from '@api/client/getHeaders';
import {ENV} from '@constants/env';

export function getConfig() {
  return get<AuthConfig>(ENV.AUTH_CONFIG_URL ?? '', undefined, undefined, {
    headers: NO_CACHE_HEADERS,
  });
}
