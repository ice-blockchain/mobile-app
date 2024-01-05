// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {t} from '@translations/i18n';

export const registrationUpdate = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.registrationUpdate},
      title: t('pop_up.registration_update_title'),
      message: t('pop_up.registration_update_text'),
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
