// SPDX-License-Identifier: ice License 1.0

import {NotificationDomain} from '@api/notifications/types';
import {pushNotificationByTypeSelector} from '@store/modules/Notifications/selectors';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {useSelector} from 'react-redux';

export function useIsPushNotificationsChannelEnabled(
  channelName: NotificationDomain,
) {
  const hasPushPermissions = useSelector(
    isPermissionGrantedSelector('pushNotifications'),
  );
  const settings = useSelector(pushNotificationByTypeSelector);

  if (!hasPushPermissions) {
    return false;
  }

  if (!settings) {
    // default is true. User has to explicitly disable em
    return true;
  }
  return !settings.some(
    ({type, enabled}) =>
      (type === 'disable_all' && enabled) || (type === channelName && !enabled),
  );
}
