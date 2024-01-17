// SPDX-License-Identifier: ice License 1.0

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {store} from '@store/configureStore';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {isDataOnlyMessage} from '@store/modules/PushNotifications/utils/isDataOnlyMessage';

/**
 * Resolve handler promise only when all the work is done
 */
const backgroundMessageHandler = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  if (isDataOnlyMessage(message)) {
    let finishTask;
    const deferred = new Promise(resolve => (finishTask = resolve));
    store.dispatch(
      PushNotificationsActions.DATA_MESSAGE_ARRIVE.STATE.create({
        message,
        finishTask,
      }),
    );
    await deferred;
  }
};

export const registerBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(backgroundMessageHandler);
};
