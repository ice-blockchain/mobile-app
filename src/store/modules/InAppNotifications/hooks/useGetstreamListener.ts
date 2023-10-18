// SPDX-License-Identifier: ice License 1.0

import {announcementsFeed, inAppNotificationsFeed} from '@services/getStream';
import {Activity} from '@services/getStream/types';
import {logError} from '@services/logging';
import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import {DefaultGenerics, RealTimeMessage, SiteError} from 'getstream';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export const useGetstreamListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.START.create({
        isRefresh: true,
      }),
    );

    const callback = (data: RealTimeMessage<DefaultGenerics>) => {
      if (data?.new?.length > 0) {
        const newActivities = data.new as unknown as Activity[];
        dispatch(
          InAppNotificationActions.IN_APP_NOTIFICATIONS_ADD.STATE.create({
            notifications: newActivities,
          }),
        );
      }
    };

    const announcementsCallback = (data: RealTimeMessage<DefaultGenerics>) => {
      if (data?.new?.length > 0) {
        const newActivities = data.new as unknown as Activity[];
        dispatch(
          InAppNotificationActions.IN_APP_NOTIFICATIONS_ADD.STATE.create({
            notifications: newActivities,
          }),
        );
      }
    };

    inAppNotificationsFeed.subscribe(callback).then(
      () => {},
      (error: SiteError) => {
        logError(error);
      },
    );

    announcementsFeed.subscribe(announcementsCallback).then(
      () => {},
      (error: SiteError) => {
        logError(error);
      },
    );

    return () => {
      inAppNotificationsFeed.unsubscribe();
      announcementsFeed.unsubscribe();
    };
  }, [dispatch]);
};
