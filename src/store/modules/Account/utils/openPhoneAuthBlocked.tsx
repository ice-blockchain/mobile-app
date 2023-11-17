// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {t} from '@translations/i18n';

export const openPhoneAuthBlocked = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.phoneBlocked},
      title: t('pop_up.phone_auth_blocked_title'),
      message: t('pop_up.phone_auth_blocked_text'),
      buttons: [
        {
          text: t('button.continue'),
        },
      ],
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};
