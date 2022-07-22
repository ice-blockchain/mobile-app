// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';
import {UserProfile} from '@api/user/types';

/**
 * Modifies an user account
 */

export function modifyUser(userId: string, formData: FormData) {
  return patch<FormData, UserProfile>(`/users/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data: FormData) => data,
  });
}
