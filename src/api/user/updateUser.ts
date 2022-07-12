// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';

interface Params {
  userId: string;
  formData: FormData;
}

/**
 * Modifies an user account
 */

export function updateUser({userId, formData}: Params) {
  return patch<{formData: FormData}, Params>(`/users/${userId}`, {
    formData,
  });
}
