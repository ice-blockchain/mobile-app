// SPDX-License-Identifier: BUSL-1.1

import {post} from '@api/client';

interface Params {
  email: string;
  fullName: string;
  phoneNumber: string;
  referredBy: string;
  username: string;
}

export function createUser(userInfo: Params) {
  return post('/users', {
    ...userInfo,
  });
}
