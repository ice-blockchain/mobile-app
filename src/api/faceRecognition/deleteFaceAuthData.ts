// SPDX-License-Identifier: ice License 1.0

import {del} from '@api/client';

export function deleteFaceAuthData(): Promise<void> {
  return del<void>('/face-auth/');
}
