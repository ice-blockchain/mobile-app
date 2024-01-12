// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {t} from '@translations/i18n';

export const successfullyLinked = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.linked},
      title: t('pop_up.successfully_linked_title'),
      message: t('pop_up.successfully_linked_text'),
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
