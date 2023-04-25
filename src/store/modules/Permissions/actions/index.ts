// SPDX-License-Identifier: ice License 1.0

import {PermissionType} from '@store/modules/Permissions/reducer';
import {createAction} from '@store/utils/actions/createAction';
import {PermissionStatus} from 'react-native-permissions';

export type PermissionsType = {
  contacts: PermissionStatus;
  pushNotifications: PermissionStatus;
  camera: PermissionStatus;
};

const GET_PERMISSIONS = createAction('GET_PERMISSIONS', {
  START: (type: PermissionType) => ({type}),
  SUCCESS: (type: PermissionType, status: PermissionStatus) => ({type, status}),
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
