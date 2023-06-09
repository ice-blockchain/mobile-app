// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {Activity, ActivitySection} from '@services/getStream/types';
import {t} from '@translations/i18n';

export const orderDataBySections = (activities: Activity[]) => {
  const sections: (ActivitySection & {
    data: Activity[];
  })[] = [];

  const sortedByTime = activities.sort((activityOne, activityTwo) => {
    return dayjs(activityOne.time).diff(dayjs(activityTwo.time));
  });

  sortedByTime.forEach((activity: Activity) => {
    const title = dayjs().calendar(dayjs(activity.time), {
      sameDay: `${t('global.date.today')}`,
      lastDay: `${t('notification_feed_screen.yesterday')}`,
      lastWeek: `${t('notification_feed_screen.last_week')}`,
      sameElse: (date: dayjs.Dayjs) => {
        const from = dayjs(activity.time);
        const dayDiff = date.diff(from, 'day');
        if (dayDiff < 7) {
          return `${t('notification_feed_screen.this_week')}`;
        } else if (dayDiff >= 7 && dayDiff <= 14) {
          return `${t('notification_feed_screen.last_week')}`;
        } else {
          const monthDiff = date.diff(from, 'month', false);
          if (monthDiff === 0) {
            return `${t('notification_feed_screen.this_month')}`;
          }
          if (monthDiff === 1) {
            return `${t('notification_feed_screen.last_month')}`;
          }
          if (monthDiff > 1) {
            if (Number(from.format('YYYY')) - Number(date.format('YYYY')) < 0) {
              return `${from.format('YYYY')}`;
            }
            return `${from.format('MMMM')}`;
          }
        }
      },
    });

    const section = sections.find(
      sectionedActivity => sectionedActivity.sectionTitle === title,
    );
    if (section) {
      section.data.splice(0, 0, activity);
    } else {
      sections.splice(0, 0, {sectionTitle: title, data: [activity]});
    }
  });
  return sections;
};
