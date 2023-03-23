// SPDX-License-Identifier: ice License 1.0

import {Activity} from '@api/notifications/types';
import {announcementsFeed, notificationsFeed} from '@services/getstream';
import {logError} from '@services/logging';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {DefaultGenerics, RealTimeMessage, SiteError} from 'getstream';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export const useGetstreamListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      NotificationActions.NOTIFICATIONS_LOAD.START.create({isRefresh: true}),
    );

    const callback = (data: RealTimeMessage<DefaultGenerics>) => {
      if (data?.new?.length > 0) {
        const newActivities = data.new as unknown as Activity[];
        dispatch(
          NotificationActions.NOTIFICATIONS_ADD.STATE.create({
            notifications: newActivities,
          }),
        );
      }
    };

    const announcementsCallback = (data: RealTimeMessage<DefaultGenerics>) => {
      if (data?.new?.length > 0) {
        const newActivities = data.new as unknown as Activity[];
        dispatch(
          NotificationActions.NOTIFICATIONS_ADD.STATE.create({
            notifications: newActivities,
          }),
        );
      }
    };

    notificationsFeed.subscribe(callback).then(
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
      notificationsFeed.unsubscribe();
      announcementsFeed.unsubscribe();
    };
  }, [dispatch]);
};
