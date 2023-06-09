// SPDX-License-Identifier: ice License 1.0

import {Activity} from '@services/getStream/types';
import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import produce from 'immer';

export interface State {
  items: {
    [activityId: string]: Activity;
  };
  hasMore: boolean;
}

const actionCreatorNotificationsLoad =
  InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.SUCCESS.create;
const actionCreatorFailedNotificationsLoad =
  InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.FAILED.create;
const actionCreatorClearNotifications =
  InAppNotificationActions.REMOVE_IN_APP_NOTIFICATIONS.SUCCESS.create;
const actionCreatorFailedClearNotifications =
  InAppNotificationActions.REMOVE_IN_APP_NOTIFICATIONS.FAILED.create;

type Actions =
  | ReturnType<typeof actionCreatorNotificationsLoad>
  | ReturnType<typeof actionCreatorFailedNotificationsLoad>
  | ReturnType<typeof actionCreatorClearNotifications>
  | ReturnType<typeof actionCreatorFailedClearNotifications>;

const INITIAL_STATE: State = {
  items: {},
  hasMore: true,
};

export function inAppNotificationsReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.SUCCESS.type:
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
      case InAppNotificationActions.REMOVE_IN_APP_NOTIFICATIONS.SUCCESS.type:
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
