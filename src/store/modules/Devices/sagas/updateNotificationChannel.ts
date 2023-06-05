// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {DeviceActions} from '@store/modules/Devices/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put} from 'redux-saga/effects';

export function* updateNotificationChannel(
  action: ReturnType<
    typeof DeviceActions.UPDATE_NOTIFICATION_CHANNEL.START.create
  >,
) {
  const {notificationChannel, notificationDeliveryChannel} = action.payload;
  try {
    yield call(
      Api.notifications.toggleNotificationDomainOnOff,
      notificationChannel,
      notificationDeliveryChannel,
    );

    yield put(
      DeviceActions.UPDATE_NOTIFICATION_CHANNEL.SUCCESS.create(
        notificationChannel,
        notificationDeliveryChannel,
      ),
    );
    AnalyticsEventLogger.trackNotificationSettingsUpdate({
      notificationChannel,
      notificationDeliveryChannel,
    });
  } catch (error) {
    yield put(
      DeviceActions.UPDATE_NOTIFICATION_CHANNEL.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
