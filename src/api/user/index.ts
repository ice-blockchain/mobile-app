// SPDX-License-Identifier: BUSL-1.1

import {createUser} from './createUser';
import {deleteUser} from './deleteUser';
import {getUserById} from './getUserById';
import {getUserViews} from './getUserViews';
import {searchUsers} from './searchUsers';
import {updateUser} from './updateUser';

export const user = Object.freeze({
  deleteUser,
  getUserById,
  getUserViews,
  searchUsers,
  updateUser,
  createUser,
});
