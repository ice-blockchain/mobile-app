// SPDX-License-Identifier: ice License 1.0

import {LottieViewProps} from '@components/LottieView';
import {Touchable} from '@components/Touchable';
import {
  MEDIUM_BONUS_THRESHOLD,
  SMALL_BONUS_THRESHOLD,
} from '@constants/bonuses';
import {LINKS} from '@constants/links';
import {FORCE_LTR_TEXT_CHAR} from '@constants/rtl';
import {LottieAnimations} from '@lottie';
import {navigate} from '@navigation/utils';
import {Warning} from '@screens/Modals/PopUp/components/Warning';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';

export const openBonusClaimed = ({claimedBonus}: {claimedBonus: number}) => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  let animationSource: LottieViewProps['source'];
  if (claimedBonus <= SMALL_BONUS_THRESHOLD) {
    animationSource = LottieAnimations.bonusSmall;
  } else if (claimedBonus <= MEDIUM_BONUS_THRESHOLD) {
    animationSource = LottieAnimations.bonusMedium;
  } else {
    animationSource = LottieAnimations.bonusBig;
  }

  navigate({
    name: 'PopUp',
    key: 'claim-bonus-popup',
    params: {
      animationProps: {source: animationSource},
      banner: `${FORCE_LTR_TEXT_CHAR}+${claimedBonus}%`,
      title: t('extra_bonus.result_title'),
      message: t('extra_bonus.extra_message'),
      warning: (
        <Touchable
          onPress={() => openLinkWithInAppBrowser({url: LINKS.BONUSES})}>
          <Warning text={t('extra_bonus.link')} />
        </Touchable>
      ),
      showCloseButton: true,
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};
