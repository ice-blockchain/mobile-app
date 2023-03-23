// SPDX-License-Identifier: ice License 1.0

import {Activity} from '@api/notifications/types';
import {createAction} from '@store/utils/actions/createAction';

const NOTIFICATIONS_LOAD = createAction('NOTIFICATIONS_LOAD', {
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

const NOTIFICATIONS_ADD = createAction('NOTIFICATIONS_ADD', {
  STATE: (payload: {notifications: Activity[]}) => payload,
});

const REMOVE_NOTIFICATIONS = createAction('REMOVE_NOTIFICATIONS', {
  START: (notificationIds: string[]) => ({
    notificationIds,
  }),
  SUCCESS: (payload: {notificationIds: string[]}) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const ADD_MOCKED_NOTIFICATIONS = createAction('ADD_MOCKED_NOTIFICATIONS', {
  STATE: () => {},
});

const ADD_MOCKED_ANNOUNCEMENTS = createAction('ADD_MOCKED_ANNOUNCEMENTS', {
  STATE: () => {},
});

const ADD_NOTIFICATIONS_AND_ANNOUNCEMENTS = createAction(
  'ADD_NOTIFICATIONS_AND_ANNOUNCEMENTS',
  {
    STATE: () => {},
  },
);

export const NotificationActions = Object.freeze({
  NOTIFICATIONS_LOAD,
  REMOVE_NOTIFICATIONS,
  ADD_MOCKED_NOTIFICATIONS,
  ADD_MOCKED_ANNOUNCEMENTS,
  ADD_NOTIFICATIONS_AND_ANNOUNCEMENTS,
  NOTIFICATIONS_ADD,
});
