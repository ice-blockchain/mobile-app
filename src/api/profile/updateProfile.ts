// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';

interface Params {
  userId: string;
  username: string | null;
}

export function updateProfile({userId, username}: Params) {
  return patch(`/profile/${userId}`, {
    username,
  });
}
