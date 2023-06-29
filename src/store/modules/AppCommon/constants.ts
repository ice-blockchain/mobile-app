// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {DeviceActions} from '@store/modules/Devices/actions';

export const INITIALIZE_ACTIONS = [
  AccountActions.USER_STATE_CHANGE,
  DeviceActions.INIT_DEVICE,
  AccountActions.SYNC_RTL,
];
