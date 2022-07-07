// SPDX-License-Identifier: BUSL-1.1

import {del} from '@api/client';
import {ApiProfile} from '@api/profile/types';

export function deleteProfile(userId: string) {
  return del<ApiProfile>(`/users/${userId}`);
}
