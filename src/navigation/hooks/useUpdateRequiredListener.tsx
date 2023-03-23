// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {Images} from '@images';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {logError} from '@services/logging';
import {DeviceActions} from '@store/modules/Devices/actions';
import {actionPayloadSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {UpdateNow} from '@svg/PopUp/UpdateNow';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';
import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {isIOS} from 'rn-units';

export const useUpdateRequiredListener = () => {
  const updateMetadataPayload = useSelector(
    actionPayloadSelector.bind(null, DeviceActions.UPDATE_DEVICE_METADATA),
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  useEffect(() => {
    if (
      checkProp(updateMetadataPayload, 'errorCode') &&
      updateMetadataPayload.errorCode === 'UPDATE_REQUIRED'
    ) {
      navigation.navigate('PopUp', {
        imageProps: {source: Images.popUp.updateRequired},
        title: t('pop_up.update_now'),
        message: t('pop_up.update_now_text'),
        buttons: [
          {
            icon: <UpdateNow fill={COLORS.white} />,
            text: t('pop_up.please_update'),
            onPress: () =>
              Linking.openURL(isIOS ? LINKS.APP_STORE : LINKS.PLAY_STORE).catch(
                logError,
              ),
          },
        ],
        dismissOnOutsideTouch: false,
        dismissOnButtonPress: false,
        dismissOnAndroidHardwareBack: false,
      });
    }
  }, [navigation, updateMetadataPayload]);
};
