// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

export type PermissionTypes =
  | 'unavailable'
  | 'blocked'
  | 'denied'
  | 'granted'
  | 'limited';

export type PermissionsType = {
  contacts: PermissionTypes;
};

const GET_CONTACTS_PERMISSIONS = createAction('GET_CONTACTS_PERMISSIONS', {
  START: true,
  SUCCESS: (status: PermissionTypes) => ({status}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const CHECK_ALL_PERMISSIONS = createAction('CHECK_ALL_PERMISSIONS', {
  START: true,
  SUCCESS: (permissions: PermissionsType) => ({permissions}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const PermissionsActions = Object.freeze({
  GET_CONTACTS_PERMISSIONS,
  CHECK_ALL_PERMISSIONS,
});
