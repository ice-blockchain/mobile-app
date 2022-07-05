// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';
import {RESULTS} from 'react-native-permissions';

export const hasContactsPermissionsSelector = (state: RootState) =>
  state.permissions.contacts === RESULTS.GRANTED;
