// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {
  mockedAnnouncements,
  mockedNotifications,
} from '@services/getStream/mockData';
import {connect} from 'getstream';

const mockedUserId = 'MOCKED_USER_ID';

const getstreamClient = connect(
  ENV.GETSTREAM_API_KEY ?? '',
  null,
  ENV.GETSTREAM_APP_ID,
);

export const inAppNotificationsFeed = getstreamClient.feed(
  'notifications',
  mockedUserId,
  ENV.GETSTREAM_NOTIFICATIONS_USER_TOKEN,
);

export const announcementsFeed = getstreamClient.feed(
  'announcements',
  mockedUserId,
  ENV.GETSTREAM_ANNOUNCEMENTS_USER_TOKEN,
);

export async function mockInAppNotifications() {
  const notifications = await inAppNotificationsFeed.addActivities(
    mockedNotifications,
  );
  return notifications;
}

export async function mockAnnouncements() {
  const announcements = await announcementsFeed.addActivities(
    mockedAnnouncements,
  );
  return announcements;
}

export async function loadInAppNotifications() {
  const notifications = await inAppNotificationsFeed.get();
  return notifications;
}

export async function loadAnnouncements() {
  const announcements = await announcementsFeed.get();
  return announcements;
}

export async function removeInAppNotification(activityId: string) {
  return await inAppNotificationsFeed.removeActivity(activityId);
}

export async function removeAnnouncement(activityId: string) {
  return await announcementsFeed.removeActivity(activityId);
}

export async function removeInAppNotifications(activityIds: string[]) {
  return await Promise.all(
    activityIds.map(id => {
      return inAppNotificationsFeed.removeActivity(id);
    }),
  );
}

export async function removeAnnouncements(activityIds: string[]) {
  return await Promise.all(
    activityIds.map(id => {
      return announcementsFeed.removeActivity(id);
    }),
  );
}
