// SPDX-License-Identifier: ice License 1.0

import {getUserNotificationChannels} from '@api/notifications/getUserNotificationChannels';
import {pingUser} from '@api/notifications/pingUser';
import {toggleNotificationDomainOnOff} from '@api/notifications/toggleNotificationDomainOnOff';

export const notifications = Object.freeze({
  getUserNotificationChannels,
  toggleNotificationDomainOnOff,
  pingUser,
});
