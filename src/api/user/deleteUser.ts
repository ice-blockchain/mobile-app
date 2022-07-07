// SPDX-License-Identifier: BUSL-1.1

import {del} from '@api/client';
import {UserProfile} from '@api/user/types';

/**
 * Deletes an user account
 */

export function deleteUser(userId: string) {
  return del<UserProfile>(`/users/${userId}`);
}
