// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {LottieAnimations} from '@lottie';
import {navigate} from '@navigation/utils';
import {PopUpButtonProps} from '@screens/Modals/PopUp/components/PopUpButton';
import {socialData} from '@store/modules/Socials/data';
import {SocialType} from '@store/modules/Socials/types';
import {InviteIcon} from '@svg/InviteIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const openSocial = (type: SocialType) => {
  let resultResolve: (value: 'yes' | 'no') => void;
  const resultPromise = new Promise<'yes' | 'no'>(r => (resultResolve = r));

  const button: PopUpButtonProps = {
    icon: <InviteIcon style={styles.icon} />,
    text: t('button.claim_bonus'),
    style: styles.button,
  };

  navigate({
    name: 'PopUp',
    params: {
      animationProps: {source: LottieAnimations.bonusClaim},
      title: socialData[type].title,
      message: socialData[type].description,
      buttons: [
        {
          ...button,
          onPress: () => {
            resultResolve('yes');
            navigate({
              name: 'PopUp',
              params: {buttons: [{...button, loading: true}]},
              merge: true,
            });
          },
        },
      ],
      dismissOnOutsideTouch: false,
      dismissOnAndroidHardwareBack: false,
      dismissOnButtonPress: false,
      onDismiss: () => resultResolve('no'),
    },
  });

  return resultPromise;
};

const styles = StyleSheet.create({
  bold: {
    color: COLORS.primaryLight,
  },
  button: {
    flex: 1,
    marginHorizontal: rem(52),
  },
  icon: {
    width: rem(24),
    height: rem(24),
  },
});
