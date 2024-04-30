// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {userIdSelector} from '@store/modules/Account/selectors';
import {AnalyticsAttributesLogger} from '@store/modules/Analytics/constants';
import {DeviceActions} from '@store/modules/Devices/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {useSubscribeToChannelTopic} from '@store/modules/PushNotifications/hooks/useSubscribeToChannelTopic';
import {useEffect} from 'react';
import ReactMoE, {
  MoEInitConfig,
  MoEngageLogConfig,
  MoEngageLogLevel,
  MoEPushConfig,
} from 'react-native-moengage/src/index';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS} from 'rn-units/index';

export function useInitNotifications() {
  const hasPushPermissions = useSelector(
    isPermissionGrantedSelector('pushNotifications'),
  );

  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);

  useEffect(() => {
    /*
        Make sure you are setting the Push/InApp callback listeners before calling the initialize().
        https://developers.moengage.com/hc/en-us/articles/4404205878676-Framework-Initialization
       */
    ReactMoE.initialize(
      ENV.MO_ENGAGE_APP_ID ?? '',
      new MoEInitConfig(
        MoEPushConfig.defaultConfig(),
        new MoEngageLogConfig(MoEngageLogLevel.NO_LOG, false),
      ),
    );
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    if (isIOS) {
      if (hasPushPermissions) {
        ReactMoE.registerForPush();
      }
    } else {
      ReactMoE.pushPermissionResponseAndroid(hasPushPermissions);
      if (hasPushPermissions) {
        ReactMoE.setupNotificationChannelsAndroid();
      }
    }
    dispatch(
      DeviceActions.UPDATE_DEVICE_METADATA.START.create({forceUpdate: true}),
    );
    AnalyticsAttributesLogger.updateNotificationPreferences({
      notificationDeliveryChannel: 'push',
    });
  }, [dispatch, hasPushPermissions, userId]);

  useSubscribeToChannelTopic('news');
  useSubscribeToChannelTopic('system');
}
