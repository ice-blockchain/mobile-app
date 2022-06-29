// SPDX-License-Identifier: BUSL-1.1

import {del} from '@api/client';

interface Params {
  userId: string;
}

export function deleteUser({userId}: Params) {
  return del(`/users/${userId}`);
}
