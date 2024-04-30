// SPDX-License-Identifier: ice License 1.0

import {DeviceLocation} from '@api/devices/types';
import {AccountActions} from '@store/modules/Account/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import produce from 'immer';

export interface State {
  deviceUniqueId: string | null;
  location: DeviceLocation | null;
  lastMetadataUpdateAt: string | null;
}

type Actions = ReturnType<
  | typeof DeviceActions.INIT_DEVICE.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof DeviceActions.UPDATE_DEVICE_LOCATION.SUCCESS.create
  | typeof DeviceActions.UPDATE_DEVICE_METADATA.SUCCESS.create
>;

const INITIAL_STATE: State = {
  deviceUniqueId: null,
  location: null,
  lastMetadataUpdateAt: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case DeviceActions.INIT_DEVICE.SUCCESS.type:
        draft.deviceUniqueId = action.payload.deviceUniqueId;
        break;
      case DeviceActions.UPDATE_DEVICE_LOCATION.SUCCESS.type:
        draft.location = action.payload;
        break;
      case DeviceActions.UPDATE_DEVICE_METADATA.SUCCESS.type:
        draft.lastMetadataUpdateAt = new Date().toISOString();
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {
          ...INITIAL_STATE,
          deviceUniqueId: state.deviceUniqueId,
          location: state.location,
        };
    }
  });
}

export const devicesReducer = reducer;
