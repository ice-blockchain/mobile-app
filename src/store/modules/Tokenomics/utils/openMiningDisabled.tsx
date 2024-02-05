// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {t} from '@translations/i18n';

export const openMiningDisabled = ({
  kycStepBlocked,
}: {
  kycStepBlocked: number;
}) => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  const message =
    kycStepBlocked === 4 ? t('quiz.mining_disabled_popup.description') : null;

  const imageProps =
    kycStepBlocked === 4 ? {source: Images.quiz.quizFailed} : undefined;

  navigate({
    name: 'PopUp',
    key: 'mining-disabled-popup',
    params: {
      imageProps,
      title: t('quiz.mining_disabled_popup.title'),
      message,
      buttons: [{text: t('button.close'), preset: 'destructive'}],
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};
