// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {User} from '@api/user/types';

type Params = {
  phoneNumber?: string | null;
  email?: string | null;
};

export function getValidUserForPhoneNumberMigration(params: Params) {
  const searchParams = new URLSearchParams();
  if (params.phoneNumber) {
    searchParams.append('phoneNumber', params.phoneNumber);
  }
  if (params.email) {
    searchParams.append('email', params.email);
  }

  return post<Params, User>(
    `auth/getValidUserForPhoneNumberMigration?${searchParams.toString()}`,
    {
      phoneNumber: params.phoneNumber,
      email: params.email,
    },
  );
}
