// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {
  mockedAnnouncements,
  mockedNotifications,
} from '@services/getstream/mockData';
import {connect} from 'getstream';

const mockedUserId = 'MOCKED_USER_ID';

const getstreamClient = connect(
  ENV.GETSTREAM_API_KEY ?? '',
  null,
  ENV.GETSTREAM_APP_ID,
);

export const notificationsFeed = getstreamClient.feed(
  'notifications',
  mockedUserId,
  ENV.GETSTREAM_NOTIFICATIONS_USER_TOKEN,
);

export const announcementsFeed = getstreamClient.feed(
  'announcements',
  mockedUserId,
  ENV.GETSTREAM_ANNOUNCEMENTS_USER_TOKEN,
);

export async function mockNotifications() {
  const notifications = await notificationsFeed.addActivities(
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

export async function loadNotifications() {
  const notifications = await notificationsFeed.get();
  return notifications;
}

export async function loadAnnouncements() {
  const announcements = await announcementsFeed.get();
  return announcements;
}

export async function removeNotification(activityId: string) {
  return await notificationsFeed.removeActivity(activityId);
}

export async function removeAnnouncement(activityId: string) {
  return await announcementsFeed.removeActivity(activityId);
}

export async function removeNotifications(activityIds: string[]) {
  return await Promise.all(
    activityIds.map(id => {
      return notificationsFeed.removeActivity(id);
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
