// SPDX-License-Identifier: ice License 1.0

import type {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export function useSubscribeToPushNotifications() {
  const dispatch = useDispatch();
  useEffect(() => {
    /*
         When a notification from FCM has triggered the application to open from a quit state,
         this method will return a `RemoteMessage` containing the notification data, or `null` if
         the app was opened via another method.
         */
    messaging()
      .getInitialNotification()
      .then((message: FirebaseMessagingTypes.RemoteMessage | null) =>
        dispatch(
          PushNotificationsActions.NOTIFICATION_PRESS.STATE.create({message}),
        ),
      );
    /*
      When the user presses a notification displayed via FCM, this listener will be called if the app
      has opened from a background state.
      */
    const unsubscribeFromOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(
        (message: FirebaseMessagingTypes.RemoteMessage) => {
          dispatch(
            PushNotificationsActions.NOTIFICATION_PRESS.STATE.create({message}),
          );
        },
      );

    const unsubscribeFromOnMessage = messaging().onMessage(
      (message: FirebaseMessagingTypes.RemoteMessage) => {
        dispatch(
          PushNotificationsActions.NOTIFICATION_ARRIVE.STATE.create({message}),
        );
      },
    );

    return () => {
      unsubscribeFromOnNotificationOpenedApp();
      unsubscribeFromOnMessage();
    };
  }, [dispatch]);
}
