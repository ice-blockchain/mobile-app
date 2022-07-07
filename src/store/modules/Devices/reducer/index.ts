// SPDX-License-Identifier: BUSL-1.1

import {DeviceSettings} from '@api/devices/types';
import {DeviceActions} from '@store/modules/Devices/actions';
import produce from 'immer';

export interface State {
  settings: DeviceSettings | null;
}

type Actions = ReturnType<typeof DeviceActions.GET_SETTINGS.SUCCESS.create>;

const INITIAL_STATE: State = {
  settings: null,
};

export function devicesReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case DeviceActions.GET_SETTINGS.SUCCESS.type:
        draft.settings = action.payload;
        break;
    }
  });
}
