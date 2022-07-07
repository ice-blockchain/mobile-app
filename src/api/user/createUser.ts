// SPDX-License-Identifier: BUSL-1.1

import {post} from '@api/client';
import {UserProfile} from '@api/user/types';

interface Params {
  email?: string;
  phoneNumber?: string;
  phoneNumberHash?: string;
  username: string;
  referredBy: string;
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
  return post<Params, UserProfile>('/users', {
    username,
    email,
    phoneNumber,
    phoneNumberHash,
    referredBy,
  });
}
