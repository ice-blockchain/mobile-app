// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_USER_BY_ID = createAction('GET_USER_BY_ID', {
  START: (userId: string) => ({userId}),
  SUCCESS: (user: User) => ({user}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const UPDATE_VIEWED_ONBOARDINGS = createAction('UPDATE_VIEWED_ONBOARDINGS', {
  STATE: (userId: string) => ({userId}),
});

const UPDATE_VIEWED_MIGRATION_AGREEMENT = createAction(
  'UPDATE_VIEWED_MIGRATION_AGREEMENT',
  {
    STATE: (migrationUserId: string) => ({migrationUserId}),
  },
);

export const UsersActions = Object.freeze({
  GET_USER_BY_ID,
  UPDATE_VIEWED_ONBOARDINGS,
  UPDATE_VIEWED_MIGRATION_AGREEMENT,
});
