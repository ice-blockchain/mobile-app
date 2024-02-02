// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {store} from '@store/configureStore';
import {kycStepBlockedSelector} from '@store/modules/Tokenomics/selectors';
import {t} from '@translations/i18n';

export const openMiningDisabled = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  const kycStepBlocked = kycStepBlockedSelector(store.getState());

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
