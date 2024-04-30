// SPDX-License-Identifier: ice License 1.0

import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {isEmpty} from 'lodash';

export const isDataOnlyMessage = (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  return message.data && isEmpty(message.notification ?? {});
};
