// SPDX-License-Identifier: BUSL-1.1

import {PermissionType} from '@store/modules/Permissions/sagas/getPermissionsSaga';
import {RootState} from '@store/rootReducer';
import {RESULTS} from 'react-native-permissions';

export const permissionSelector =
  (type: PermissionType) => (state: RootState) => {
    return state.permissions[type] === RESULTS.GRANTED;
  };
