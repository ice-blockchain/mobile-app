// SPDX-License-Identifier: ice License 1.0

import {Activity} from '@services/getStream/types';
import {createAction} from '@store/utils/actions/createAction';

const IN_APP_NOTIFICATIONS_LOAD = createAction('IN_APP_NOTIFICATIONS_LOAD', {
  START: (payload: {isRefresh: boolean}) => payload,
  SUCCESS: (payload: {
    notifications: {
      [key: string]: Activity;
    };
    hasMore: boolean;
    isRefresh: boolean;
  }) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const IN_APP_NOTIFICATIONS_ADD = createAction('IN_APP_NOTIFICATIONS_ADD', {
  STATE: (payload: {notifications: Activity[]}) => payload,
});

const REMOVE_IN_APP_NOTIFICATIONS = createAction(
  'REMOVE_IN_APP_NOTIFICATIONS',
  {
    START: (notificationIds: string[]) => ({
      notificationIds,
    }),
    SUCCESS: (payload: {notificationIds: string[]}) => payload,
    FAILED: (errorMessage: string) => ({
      errorMessage,
    }),
  },
);

const ADD_IN_APP_MOCKED_NOTIFICATIONS = createAction(
  'ADD_IN_APP_MOCKED_NOTIFICATIONS',
  {
    STATE: () => {},
  },
);

const ADD_MOCKED_ANNOUNCEMENTS = createAction('ADD_MOCKED_ANNOUNCEMENTS', {
  STATE: () => {},
});

const ADD_IN_APP_NOTIFICATIONS_AND_ANNOUNCEMENTS = createAction(
  'ADD_IN_APP_NOTIFICATIONS_AND_ANNOUNCEMENTS',
  {
    STATE: () => {},
  },
);

export const InAppNotificationActions = Object.freeze({
  IN_APP_NOTIFICATIONS_LOAD,
  REMOVE_IN_APP_NOTIFICATIONS,
  ADD_IN_APP_MOCKED_NOTIFICATIONS,
  ADD_MOCKED_ANNOUNCEMENTS,
  ADD_IN_APP_NOTIFICATIONS_AND_ANNOUNCEMENTS,
  IN_APP_NOTIFICATIONS_ADD,
});
