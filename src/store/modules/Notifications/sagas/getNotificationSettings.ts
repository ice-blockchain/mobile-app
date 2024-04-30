// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {NotificationSettings} from '@api/notifications/types';
import {isAuthorizedSelector} from '@store/modules/Account/selectors';
import {AnalyticsAttributesLogger} from '@store/modules/Analytics/constants';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {getErrorMessage} from '@utils/errors';
import {all, call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getNotificationSettingsSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );

    if (isAuthorized) {
      const [emailNotificationChannel, pushNotificationChannel]: [
        SagaReturnType<typeof Api.notifications.getUserNotificationChannels>,
        SagaReturnType<typeof Api.notifications.getUserNotificationChannels>,
      ] = yield all([
        call(Api.notifications.getUserNotificationChannels, 'email'),
        call(Api.notifications.getUserNotificationChannels, 'push'),
      ]);

      const settings: NotificationSettings = {
        disableAllNotifications: false,
        emailNotificationSettings: emailNotificationChannel,
        pushNotificationSettings: pushNotificationChannel,
      };

      yield put(
        NotificationActions.GET_NOTIFICATION_SETTINGS.SUCCESS.create(settings),
      );
      AnalyticsAttributesLogger.updateNotificationPreferences({
        notificationDeliveryChannel: 'push',
      });
      AnalyticsAttributesLogger.updateNotificationPreferences({
        notificationDeliveryChannel: 'email',
      });
    }
  } catch (error) {
    yield put(
      NotificationActions.GET_NOTIFICATION_SETTINGS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
