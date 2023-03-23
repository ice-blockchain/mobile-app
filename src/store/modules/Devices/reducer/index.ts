// SPDX-License-Identifier: ice License 1.0

import {DeviceLocation, DeviceSettings} from '@api/devices/types';
import {AccountActions} from '@store/modules/Account/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import produce from 'immer';

export interface State {
  settings: DeviceSettings | null;
  rollBackSettings: DeviceSettings | null;
  deviceUniqueId: string | null;
  location: DeviceLocation | null;
  lastMetadataUpdateAt: string | null;
}

type Actions = ReturnType<
  | typeof DeviceActions.GET_OR_CREATE_DEVICE_SETTINGS.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof DeviceActions.UPDATE_DEVICE_LOCATION.SUCCESS.create
  | typeof DeviceActions.UPDATE_DEVICE_METADATA.SUCCESS.create
  | typeof DeviceActions.UPDATE_NOTIFICATION_CHANNEL.SUCCESS.create
>;

const INITIAL_STATE: State = {
  settings: null,
  rollBackSettings: null,
  deviceUniqueId: null,
  location: null,
  lastMetadataUpdateAt: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case DeviceActions.GET_OR_CREATE_DEVICE_SETTINGS.SUCCESS.type:
        draft.deviceUniqueId = action.payload.deviceUniqueId;
        draft.rollBackSettings = action.payload.settings;
        draft.settings = action.payload.settings;
        break;
      case DeviceActions.UPDATE_DEVICE_LOCATION.SUCCESS.type:
        draft.location = action.payload;
        break;
      case DeviceActions.UPDATE_DEVICE_METADATA.SUCCESS.type:
        draft.lastMetadataUpdateAt = new Date().toISOString();
        break;
      case DeviceActions.UPDATE_NOTIFICATION_CHANNEL.SUCCESS.type:
        const {
          notificationChannel: {type, enabled},
          notificationDeliveryChannel,
        } = action.payload;
        if (draft.settings) {
          const key = (
            {
              email: 'emailNotificationSettings',
              push: 'pushNotificationSettings',
            } as const
          )[notificationDeliveryChannel];
          const notification = draft.settings[key].find(
            notificationDomain => notificationDomain.type === type,
          );
          if (notification) {
            notification.enabled = enabled;
          }
        }
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
