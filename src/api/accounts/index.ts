// SPDX-License-Identifier: BUSL-1.1

import {getPublicInfoByUsername} from './getPublicInfoByUsername';
import {getUserAccount} from './getUserAccount';
import {createUser} from './createUser';
import {deleteUser} from './deleteUser';
import {updateUser} from './updateUser';

export const accounts = Object.freeze({
  getPublicInfoByUsername,
  getUserAccount,
  createUser,
  deleteUser,
  updateUser,
});
