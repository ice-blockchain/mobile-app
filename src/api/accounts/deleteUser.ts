// SPDX-License-Identifier: BUSL-1.1

import {deleteRequest} from '@api/client';

interface Params {
  userId: string;
}

export function deleteUser({userId}: Params) {
  return deleteRequest(`/users/${userId}`);
}
