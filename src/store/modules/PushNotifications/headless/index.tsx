// SPDX-License-Identifier: ice License 1.0

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {handleDataMessageSaga} from '@store/modules/PushNotifications/sagas/handleDataMessageSaga';
import {isDataOnlyMessage} from '@store/modules/PushNotifications/utils/isDataOnlyMessage';
import {runSaga} from 'redux-saga';

/**
 * Resolve handler promise only when all the work is done
 */
const backgroundMessageHandler = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  if (isDataOnlyMessage(message)) {
    await new Promise<void>(resolve => {
      runSaga(
        {},
        handleDataMessageSaga,
        PushNotificationsActions.DATA_MESSAGE_ARRIVE.STATE.create({
          message,
          finishTask: resolve,
        }),
      );
    });
  }
};

export const registerBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(backgroundMessageHandler);
};
