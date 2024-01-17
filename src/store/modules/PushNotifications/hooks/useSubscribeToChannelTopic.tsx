// SPDX-License-Identifier: ice License 1.0

import {NotificationDomain} from '@api/notifications/types';
import messaging from '@react-native-firebase/messaging';
import {logError} from '@services/logging';
import {
  appLocaleSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {useIsPushNotificationsChannelEnabled} from '@store/modules/Notifications/hooks/useIsPushNotificationsChannelEnabled';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export function useSubscribeToChannelTopic(channelName: NotificationDomain) {
  const channelEnabled = useIsPushNotificationsChannelEnabled(channelName);
  const language = useSelector(appLocaleSelector);
  const userId = useSelector(userIdSelector);

  useEffect(() => {
    const deprecatedTopicName = `${channelName}_${language}`;
    const topicName = `${channelName}_${language}_v2`;

    if (channelEnabled && language && userId) {
      messaging().unsubscribeFromTopic(deprecatedTopicName).catch(logError);
      messaging().subscribeToTopic(topicName).catch(logError);
    }
    return () => {
      if (language) {
        messaging().unsubscribeFromTopic(topicName).catch(logError);
        messaging().unsubscribeFromTopic(deprecatedTopicName).catch(logError);
      }
    };
  }, [channelEnabled, channelName, language, userId]);
}
