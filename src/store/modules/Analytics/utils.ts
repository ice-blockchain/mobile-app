// SPDX-License-Identifier: ice License 1.0

import {NotificationDeliveryChannel} from '@api/notifications/types';
import {getFcmToken} from '@services/firebase';
import {store} from '@store/configureStore';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';

export async function isPreferencesEnabled({
  notificationDeliveryChannel,
}: {
  notificationDeliveryChannel: NotificationDeliveryChannel;
}) {
  if (notificationDeliveryChannel === 'push') {
    const hasPushPermissions = isPermissionGrantedSelector('pushNotifications')(
      store.getState(),
    );
    if (!hasPushPermissions) {
      return false;
    }
    const token = await getFcmToken();
    if (!token) {
      return false;
    }
  }
  return true;
}
