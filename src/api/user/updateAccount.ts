// SPDX-License-Identifier: ice License 1.0

import {buildFormData, patch} from '@api/client';
import {ClearActions, User} from '@api/user/types';

export function updateAccount(
  userId: string,
  user: Partial<User & ClearActions> & {checksum: string},
) {
  const formData = buildFormData(user);
  return patch<FormData, User>(`/users/${userId}`, formData);
}
