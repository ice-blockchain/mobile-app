// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {LINKS} from '@constants/links';
import {LottieAnimations} from '@lottie';
import {navigate} from '@navigation/utils';
import {Warning} from '@screens/Modals/PopUp/components/Warning';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const openBonusExpired = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    key: 'claim-bonus-popup',
    params: {
      animationProps: {source: LottieAnimations.bonusExpired},
      title: t('extra_bonus.expired_title'),
      message: t('extra_bonus.expired_message'),
      warning: (
        <Touchable
          onPress={() => openLinkWithInAppBrowser({url: LINKS.BONUSES})}>
          <Warning text={t('extra_bonus.link')} />
        </Touchable>
      ),
      buttons: [
        {
          text: t('button.close'),
          style: styles.button,
        },
      ],
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: rem(52),
  },
});
