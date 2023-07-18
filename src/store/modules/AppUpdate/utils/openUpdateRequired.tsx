// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {UpdateIcon} from '@svg/UpdateIcon';
import {t} from '@translations/i18n';
import {openLink} from '@utils/device';
import React from 'react';

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
          icon: <UpdateIcon />,
          text: t('pop_up.please_update'),
          onPress: () => openLink(LINKS.APP_UPDATE),
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
