// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {User} from '@api/user/types';

type Params = {
  phoneNumber?: string;
  email?: string;
};

export function getValidUserForPhoneNumberMigration(params: Params) {
  let paramsString = '';

  if (params.phoneNumber) {
    paramsString = `phoneNumber=${encodeURIComponent(params.phoneNumber)}`;
  }

  if (params.email) {
    paramsString += `&email=${encodeURIComponent(params.email)}`;
  }

  return post<Params, User>(
    `auth/getValidUserForPhoneNumberMigration?${paramsString}`,
    {
      phoneNumber: params.phoneNumber,
      email: params.email,
    },
  );
}
