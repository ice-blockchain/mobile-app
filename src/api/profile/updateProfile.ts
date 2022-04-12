// SPDX-License-Identifier: BUSL-1.1

import axios from 'src/api/utils/axios';

interface Params {
  userId: string;
  username: string | null;
}

export default function updateProfile({userId, username}: Params) {
  return axios.patch(`/profile/${userId}`, {
    username,
  });
}
