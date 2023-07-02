// SPDX-License-Identifier: ice License 1.0

import {AuthConfig} from '@api/auth/types';
import {get} from '@api/client';
import {LINKS} from '@constants/links';

export function getConfig(): Promise<AuthConfig> {
  return get<AuthConfig>(LINKS.AUTH_CONFIG);
}
