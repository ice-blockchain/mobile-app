// SPDX-License-Identifier: BUSL-1.1

import {del} from '@api/client';

/**
 * Deletes an user account
 */

export function deleteUser(userId: string) {
  return del(`/users/${userId}`);
}
