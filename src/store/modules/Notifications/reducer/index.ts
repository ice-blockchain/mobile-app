// SPDX-License-Identifier: ice License 1.0

import {NotificationSettings} from '@api/notifications/types';
import {AccountActions} from '@store/modules/Account/actions';
import {NotificationActions} from '@store/modules/Notifications/actions';
import produce from 'immer';

export interface State {
  settings: NotificationSettings | null;
  rollBackSettings: NotificationSettings | null;
}

type Actions = ReturnType<
  | typeof NotificationActions.GET_NOTIFICATION_SETTINGS.SUCCESS.create
  | typeof NotificationActions.UPDATE_NOTIFICATION_CHANNEL.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  settings: null,
  rollBackSettings: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case NotificationActions.GET_NOTIFICATION_SETTINGS.SUCCESS.type:
        draft.rollBackSettings = action.payload.settings;
        draft.settings = action.payload.settings;
        break;
      case NotificationActions.UPDATE_NOTIFICATION_CHANNEL.SUCCESS.type:
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
        return {...INITIAL_STATE};
    }
  });
}

export const notificationsReducer = reducer;
