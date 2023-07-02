// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {DeviceActions} from '@store/modules/Devices/actions';

/**
 * Actions that should be fulfilled before we show the main app UI
 */
export const INITIALIZE_ACTIONS = [
  /**
   * Is required to determine a user's state - authorized or not
   */
  AccountActions.USER_STATE_CHANGE,

  /**
   * Is required to set deviceUniqueId that is used in other places
   */
  DeviceActions.INIT_DEVICE,

  /**
   * Is required to get a device country and city based on ip
   * It is used to determine what auth flow to show
   */
  DeviceActions.UPDATE_DEVICE_LOCATION,

  /**
   * Based on this config and device country we show a specific auth flow
   */
  AccountActions.GET_AUTH_CONFIG,
];
