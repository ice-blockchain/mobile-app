// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {t} from '@translations/i18n';

export const openSetEmail = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.email},
      title: t('pop_up.confirm_email_title'),
      message: t('pop_up.confirm_email_text'),
      buttons: [
        {
          text: t('button.continue'),
        },
      ],
      dismissOnOutsideTouch: false,
      dismissOnAndroidHardwareBack: false,
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};
