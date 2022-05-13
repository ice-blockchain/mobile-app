// SPDX-License-Identifier: BUSL-1.1

import usernameValidation from './usernameValidation';
import phoneValidation from './phoneValidation';
import createUser from './createUser';
import deleteUser from './deleteUser';
import updateUser from './updateUser';

const users = Object.freeze({
  usernameValidation,
  phoneValidation,
  createUser,
  deleteUser,
  updateUser,
});

export default users;
