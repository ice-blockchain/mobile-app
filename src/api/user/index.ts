// SPDX-License-Identifier: ice License 1.0

import {createUser} from './createUser';
import {deleteUser} from './deleteUser';
import {getUserById} from './getUserById';
import {getUserByUsername} from './getUserByUsername';
import {searchUsers} from './searchUsers';
import {updateAccount} from './updateAccount';

export const user = Object.freeze({
  createUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  updateAccount,
  searchUsers,
});
