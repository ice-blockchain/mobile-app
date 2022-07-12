// SPDX-License-Identifier: BUSL-1.1

import {DeviceSettings} from '@api/devices/types';
import {DeviceActions} from '@store/modules/Devices/actions';
import produce from 'immer';
import {merge} from 'lodash';

export interface State {
  settings: DeviceSettings | null;
  rollBackSettings: DeviceSettings | null;
  deviceUniqueId: string | null;
  isInitialized: boolean;
}

type Actions = ReturnType<
  | typeof DeviceActions.GET_SETTINGS.SUCCESS.create
  | typeof DeviceActions.SET_DEVICE_UNIQUE_ID.STATE.create
  | typeof DeviceActions.UPDATE_SETTINGS.START.create
  | typeof DeviceActions.UPDATE_SETTINGS.SUCCESS.create
  | typeof DeviceActions.UPDATE_SETTINGS.FAILED.create
>;

const INITIAL_STATE: State = {
  settings: null,
  rollBackSettings: null,
  deviceUniqueId: null,
  isInitialized: false,
};

export function devicesReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case DeviceActions.GET_SETTINGS.SUCCESS.type:
        draft.rollBackSettings = action.payload;
        draft.settings = action.payload;
        break;
      case DeviceActions.SET_DEVICE_UNIQUE_ID.STATE.type:
        draft.deviceUniqueId = action.payload.deviceUniqueId;
        draft.isInitialized = true;
        break;
      case DeviceActions.UPDATE_SETTINGS.SUCCESS.type:
        draft.rollBackSettings = action.payload;
        break;
      case DeviceActions.UPDATE_SETTINGS.START.type:
        if (state.settings) {
          draft.settings = merge(draft.settings, action.payload);
        }
        break;
      case DeviceActions.UPDATE_SETTINGS.FAILED.type:
        draft.settings = state.rollBackSettings;
        break;
    }
  });
}
