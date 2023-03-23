// SPDX-License-Identifier: ice License 1.0

import {Activity, ActivitySection} from '@api/notifications/types';
import {createSelector} from '@reduxjs/toolkit';
import {orderDataBySections} from '@store/modules/Notifications/selectors/orderNotifications';
import {RootState} from '@store/rootReducer';

export const hasMoreToLoadSelector = (state: RootState) =>
  state.notifications.hasMore;

export const notificationsByIdsSelector = (state: RootState) =>
  state.notifications.items;

export const notificationsCountSelector = (state: RootState) => {
  return Object.keys(state.notifications.items).length;
};

export const getNotificationsListDataSelector = createSelector(
  [notificationsByIdsSelector],
  (
    items,
  ): ActivitySection &
    {
      data: Activity[];
    }[] => {
    const allActivities = Object.values(items);
    return orderDataBySections(allActivities);
  },
);
