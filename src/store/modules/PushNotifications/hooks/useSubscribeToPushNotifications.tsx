// SPDX-License-Identifier: ice License 1.0

import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import type {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {CHANNEL_ID} from '@store/modules/PushNotifications/constants';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {isAndroid} from 'rn-units';

notifee.createChannel({
  id: CHANNEL_ID,
  name: 'Default Channel',
});

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
      .then((message: FirebaseMessagingTypes.RemoteMessage | null) => {
        if (message) {
          dispatch(
            PushNotificationsActions.NOTIFICATION_PRESS.STATE.create({
              data: message?.data,
            }),
          );
        }
      });
    /*
      When the user presses a notification displayed via FCM, this listener will be called if the app
      has opened from a background state.
      */
    const unsubscribeFromOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(
        (message: FirebaseMessagingTypes.RemoteMessage) => {
          dispatch(
            PushNotificationsActions.NOTIFICATION_PRESS.STATE.create({
              data: message?.data,
            }),
          );
        },
      );

    const unsubscribeFromOnMessage = messaging().onMessage(
      (message: FirebaseMessagingTypes.RemoteMessage) => {
        if (isAndroid) {
          if (!message.notification) {
            return;
          }
          notifee.displayNotification({
            title: message.notification.title,
            body: message.notification.body,
            data: message?.data,
            android: {
              channelId: CHANNEL_ID,
              smallIcon: 'ic_stat_notification',
              sound: 'default',
              color: '#1B47C3',
              ...(message.notification.android?.imageUrl
                ? {
                    largeIcon: message.notification.android?.imageUrl,
                    style: {
                      type: AndroidStyle.BIGPICTURE,
                      picture: message.notification.android?.imageUrl,
                    },
                  }
                : {}),
              importance: AndroidImportance.HIGH,
              pressAction: {
                id: 'default',
              },
            },
          });
        } else {
          dispatch(
            PushNotificationsActions.NOTIFICATION_PRESS.STATE.create({
              data: message?.data,
            }),
          );
        }
      },
    );

    notifee.getInitialNotification().then(initialNotification => {
      if (initialNotification) {
        dispatch(
          PushNotificationsActions.NOTIFICATION_PRESS.STATE.create({
            data: initialNotification.notification?.data,
          }),
        );
      }
    });

    const unsubscribeFromNotifeeForegroundListener = notifee.onForegroundEvent(
      ({type, detail}) => {
        switch (type) {
          case EventType.PRESS:
            dispatch(
              PushNotificationsActions.NOTIFICATION_PRESS.STATE.create({
                data: detail.notification?.data,
              }),
            );
            break;
        }
      },
    );

    notifee.onBackgroundEvent(async ({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          dispatch(
            PushNotificationsActions.NOTIFICATION_PRESS.STATE.create({
              data: detail.notification?.data,
            }),
          );
          break;
      }
    });

    return () => {
      unsubscribeFromOnNotificationOpenedApp();
      unsubscribeFromOnMessage();
      unsubscribeFromNotifeeForegroundListener();
    };
  }, [dispatch]);
}
