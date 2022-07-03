// SPDX-License-Identifier: BUSL-1.1

import {PermissionType} from '@store/modules/Permissions/sagas/getPermissionsSaga';
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

const GET_PERMISSIONS = createAction('GET_PERMISSIONS', {
  START: (type: PermissionType) => ({type}),
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
  GET_PERMISSIONS,
  CHECK_ALL_PERMISSIONS,
});
