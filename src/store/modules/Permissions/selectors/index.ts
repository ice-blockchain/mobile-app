// SPDX-License-Identifier: ice License 1.0

import {PermissionType} from '@store/modules/Permissions/reducer';
import {RootState} from '@store/rootReducer';
import {RESULTS} from 'react-native-permissions';

export const isPermissionGrantedSelector =
  (type: PermissionType) => (state: RootState) => {
    return state.permissions[type] === RESULTS.GRANTED;
  };

export const isPermissionFetchedSelector =
  (type: PermissionType) => (state: RootState) => {
    return state.permissions[type] !== null;
  };

export const canAskPermissionSelector =
  (type: PermissionType) => (state: RootState) => {
    return state.permissions[type] === RESULTS.DENIED;
  };
