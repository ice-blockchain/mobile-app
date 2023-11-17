// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';

export function getUserByPhoneNumber({phoneNumber}: {phoneNumber: string}) {
  console.log('phoneNumber', phoneNumber);
  return new Promise<User | null>(r => setTimeout(() => r(null), 100));
}
