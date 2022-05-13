// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

const USERNAME_VALIDATION = createAction('USERNAME_VALIDATION', {
  START: (username: string) => ({username}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const UsersActions = Object.freeze({
  USERNAME_VALIDATION,
});

export default UsersActions;
