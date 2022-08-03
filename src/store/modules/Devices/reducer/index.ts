// SPDX-License-Identifier: BUSL-1.1

import {DeviceLocation, DeviceSettings} from '@api/devices/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import produce from 'immer';
import {merge} from 'lodash';

export interface State {
  settings: DeviceSettings | null;
  rollBackSettings: DeviceSettings | null;
  deviceUniqueId: string | null;
  isInitialized: boolean;
  location: DeviceLocation | null;
}

type Actions = ReturnType<
  | typeof DeviceActions.GET_OR_CREATE_SETTINGS.SUCCESS.create
  | typeof DeviceActions.INIT_DEVICE.STATE.create
  | typeof DeviceActions.UPDATE_SETTINGS.START.create
  | typeof DeviceActions.UPDATE_SETTINGS.SUCCESS.create
  | typeof DeviceActions.UPDATE_SETTINGS.FAILED.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof DeviceActions.UPDATE_DEVICE_LOCATION.SUCCESS.create
>;

const INITIAL_STATE: State = {
  settings: null,
  rollBackSettings: null,
  deviceUniqueId: null,
  isInitialized: false,
  location: null,
};

export function devicesReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case DeviceActions.GET_OR_CREATE_SETTINGS.SUCCESS.type:
        draft.rollBackSettings = action.payload;
        draft.settings = action.payload;
        break;
      case DeviceActions.INIT_DEVICE.STATE.type:
        draft.deviceUniqueId = action.payload.deviceUniqueId;
        draft.rollBackSettings = action.payload.settings;
        draft.settings = action.payload.settings;
        draft.isInitialized = true;
        break;
      case DeviceActions.UPDATE_SETTINGS.START.type:
        if (state.settings) {
          draft.settings = merge(draft.settings, action.payload);
        }
        break;
      case DeviceActions.UPDATE_SETTINGS.SUCCESS.type:
        draft.rollBackSettings = action.payload;
        break;
      case DeviceActions.UPDATE_SETTINGS.FAILED.type:
        draft.settings = state.rollBackSettings;
        break;
      case DeviceActions.UPDATE_DEVICE_LOCATION.SUCCESS.type:
        draft.location = action.payload;
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type:
        return {
          ...INITIAL_STATE,
          deviceUniqueId: state.deviceUniqueId,
          location: state.location,
          isInitialized: true,
        };
    }
  });
}
