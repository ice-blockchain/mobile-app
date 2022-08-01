// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';
import {User} from '@api/user/types';

/**
 * Modifies an user account
 */

export function modifyUser(userId: string, user: Partial<User>) {
  const formData = new FormData();
  for (let key in user) {
    formData.append(key, user[key as keyof User]);
  }
  return patch<FormData, User>(`/users/${userId}`, formData);
}
