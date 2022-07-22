// SPDX-License-Identifier: BUSL-1.1

import {createUser} from './createUser';
import {deleteUser} from './deleteUser';
import {getUserById} from './getUserById';
import {getUserByUsername} from './getUserByUsername';
import {modifyUser} from './modifyUser';
import {searchUsers} from './searchUsers';

export const user = Object.freeze({
  createUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  modifyUser,
  searchUsers,
});
