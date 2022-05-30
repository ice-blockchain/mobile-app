// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {ApiProfile} from '@api/profile/types';

export function getProfile(profileId: string) {
  return get<ApiProfile>(`/profile/${profileId}`);
}
