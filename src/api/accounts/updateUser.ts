// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';

interface Params {
  userId: string;
  formData: FormData;
}

export default function updateUser({userId, formData}: Params) {
  return patch(`/users/${userId}`, formData);
}
