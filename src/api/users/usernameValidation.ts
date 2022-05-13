// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';

interface Params {
  username: string;
}

export default async function validateUsername({username}: Params) {
  console.log(username);

  const r = await put('/user-validations/username', {
    username,
  });

  console.log(r);
  return r;
}
