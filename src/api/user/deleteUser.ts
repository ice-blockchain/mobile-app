// SPDX-License-Identifier: ice License 1.0

import {del} from '@api/client';

/**
 * Deletes an user account
 */

export function deleteUser(userId: string) {
  return del(`/users/${userId}`);
}
