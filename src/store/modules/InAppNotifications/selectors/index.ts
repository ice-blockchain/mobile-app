// SPDX-License-Identifier: ice License 1.0

import {createSelector} from '@reduxjs/toolkit';
import {Activity, ActivitySection} from '@services/getStream/types';
import {orderDataBySections} from '@store/modules/InAppNotifications/selectors/orderNotifications';
import {RootState} from '@store/rootReducer';

export const hasMoreToLoadSelector = (state: RootState) =>
  state.inAppNotifications.hasMore;

export const inAppNotificationsByIdsSelector = (state: RootState) =>
  state.inAppNotifications.items;

export const inAppNotificationsCountSelector = (state: RootState) => {
  return Object.keys(state.inAppNotifications.items).length;
};

export const getInAppNotificationsListDataSelector = createSelector(
  [inAppNotificationsByIdsSelector],
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
