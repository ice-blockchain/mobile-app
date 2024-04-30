// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {ListIcon} from '@svg/ListIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';

export const openUpdateSuccessful = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    key: 'update-successful-popup',
    params: {
      imageProps: {source: Images.popUp.upToDate},
      title: t('pop_up.you_are_up_to_date'),
      message: t('pop_up.up_to_date_text'),
      buttons: [
        {
          icon: <ListIcon />,
          text: t('button.view_changelog'),
          onPress: () => {
            openLinkWithInAppBrowser({url: LINKS.CHANGELOG});
          },
        },
      ],
      showCloseButton: true,
      dismissOnOutsideTouch: false,
      dismissOnAndroidHardwareBack: false,
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};
