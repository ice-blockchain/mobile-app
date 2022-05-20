// SPDX-License-Identifier: BUSL-1.1

import {ApiProfile} from '../utils/types';
import {get} from '@api/client';

export default function getProfile(profileId: string) {
  return get<ApiProfile>(`/profile/${profileId}`);
}
