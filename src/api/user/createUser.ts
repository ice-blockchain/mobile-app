// SPDX-License-Identifier: BUSL-1.1

import {post} from '@api/client';

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
  return post('/users', {
    username,
    email,
    phoneNumber,
    phoneNumberHash,
    referredBy,
  });
}
