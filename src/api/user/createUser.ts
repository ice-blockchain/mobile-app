// SPDX-License-Identifier: BUSL-1.1

import {post} from '@api/client';
import {User} from '@api/user/types';

interface Params {
  username: string;
  email?: string | null;
  phoneNumber?: string | null;
  phoneNumberHash?: string | null;
  referredBy?: string | null;
}

/**
 * Modifies an user account
 */

export function createUser({
  username,
  email,
  phoneNumber,
  phoneNumberHash,
  referredBy,
}: Params) {
  return post<Params, User>('/users', {
    username,
    email,
    phoneNumber,
    phoneNumberHash,
    referredBy,
  });
}
