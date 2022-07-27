// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';
import {User} from '@api/user/types';

/**
 * Modifies an user account
 */

export function modifyUser(userId: string, formData: FormData) {
  return patch<FormData, User>(`/users/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data: FormData) => data,
  });
}
