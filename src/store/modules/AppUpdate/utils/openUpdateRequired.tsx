// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {logError} from '@services/logging';
import {UpdateNow} from '@svg/PopUp/UpdateNow';
import {t} from '@translations/i18n';
import React from 'react';
import {Linking} from 'react-native';
import {isIOS} from 'rn-units';

export const openUpdateRequired = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    params: {
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
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};
