// SPDX-License-Identifier: ice License 1.0

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {store} from '@store/configureStore';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {isDataOnlyMessage} from '@store/modules/PushNotifications/utils/isDataOnlyMessage';

const backgroundMessageHandler = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  if (isDataOnlyMessage(message)) {
    store.dispatch(
      PushNotificationsActions.DATA_MESSAGE_ARRIVE.STATE.create({
        message,
      }),
    );
  }
};

export const registerBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(backgroundMessageHandler);
};
