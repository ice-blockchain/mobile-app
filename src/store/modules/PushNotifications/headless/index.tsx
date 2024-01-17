// SPDX-License-Identifier: ice License 1.0

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

const backgroundMessageHandler = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  console.log('backgroundMessageHandler message', message);

  if (message.data?.delayed) {
  }
};

export const registerBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(backgroundMessageHandler);
};
