// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {User} from '@api/user/types';

type Params = {
  phoneNumber: string;
  email?: string;
};

export function getValidUserForPhoneNumberMigration(params: Params) {
  let paramsString = `phoneNumber=${params.phoneNumber}`;
  if (params.email) {
    paramsString += `&email=${params.email}`;
  }
  return post<Params, User>(
    `auth/getValidUserForPhoneNumberMigration?${paramsString}`,
    params,
  );
}
