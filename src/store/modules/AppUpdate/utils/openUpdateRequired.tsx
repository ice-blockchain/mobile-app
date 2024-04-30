// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {UpdateIcon} from '@svg/UpdateIcon';
import {t} from '@translations/i18n';
import {openLink, openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';
import {isIOS} from 'rn-units';

export const openUpdateRequired = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    key: 'update-required-popup',
    params: {
      imageProps: {source: Images.popUp.updateRequired},
      title: t('pop_up.update_now'),
      message: t('pop_up.update_now_text'),
      buttons: [
        {
          icon: <UpdateIcon />,
          text: t('pop_up.please_update'),
          /**
           * Opening the link in in-app browser on Android because of the Opay browser issue.
           * See `isOpayBrowserError`.
           */
          onPress: () =>
            isIOS
              ? openLink(LINKS.APP_STORE)
              : openLinkWithInAppBrowser({url: LINKS.APP_UPDATE}),
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
