// SPDX-License-Identifier: ice License 1.0

import {Activity} from '@api/notifications/types';
import {NotificationActions} from '@store/modules/Notifications/actions';
import produce from 'immer';

export interface State {
  items: {
    [activityId: string]: Activity;
  };
  hasMore: boolean;
}

const actionCreatorNotificationsLoad =
  NotificationActions.NOTIFICATIONS_LOAD.SUCCESS.create;
const actionCreatorFailedNotificationsLoad =
  NotificationActions.NOTIFICATIONS_LOAD.FAILED.create;
const actionCreatorClearNotifications =
  NotificationActions.REMOVE_NOTIFICATIONS.SUCCESS.create;
const actionCreatorFailedClearNotifications =
  NotificationActions.REMOVE_NOTIFICATIONS.FAILED.create;

type Actions =
  | ReturnType<typeof actionCreatorNotificationsLoad>
  | ReturnType<typeof actionCreatorFailedNotificationsLoad>
  | ReturnType<typeof actionCreatorClearNotifications>
  | ReturnType<typeof actionCreatorFailedClearNotifications>;

const INITIAL_STATE: State = {
  items: {},
  hasMore: true,
};

export function notificationsReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case NotificationActions.NOTIFICATIONS_LOAD.SUCCESS.type:
        {
          const {notifications, hasMore, isRefresh} = action.payload;

          if (isRefresh) {
            draft.items = notifications;
          } else {
            draft.items = {
              ...notifications,
            };
          }

          draft.hasMore = hasMore;
        }
        break;
      case NotificationActions.REMOVE_NOTIFICATIONS.SUCCESS.type:
        {
          const {notificationIds} = action.payload;
          let allItems = {...state.items};
          notificationIds.forEach(id => {
            delete allItems[id];
          });

          draft.items = {...allItems};
        }
        break;
    }
  });
}
