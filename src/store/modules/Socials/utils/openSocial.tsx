// SPDX-License-Identifier: ice License 1.0

import {PopUpButtonProps} from '@components/Buttons/PopUpButton';
import {COLORS} from '@constants/colors';
import {navigate} from '@navigation/utils';
import {socialData} from '@store/modules/Socials/data';
import {SocialType} from '@store/modules/Socials/types';
import {InviteIcon} from '@svg/InviteIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const openSocial = (type: SocialType) => {
  let resultResolve: (value: 'yes' | 'no') => void;
  const resultPromise = new Promise<'yes' | 'no'>(r => (resultResolve = r));

  const button: PopUpButtonProps = {
    icon: <InviteIcon style={styles.icon} fill={COLORS.white} />,
    text: socialData[type].buttonTitle,
    style: styles.button,
  };

  navigate({
    name: 'PopUp',
    key: 'social-popup',
    params: {
      imageProps: {source: socialData[type].image},
      imageStyle: styles.imageStyle,
      title: socialData[type].title,
      message: (
        <Text style={styles.messageText}>{socialData[type].description}</Text>
      ),
      buttons: [
        {
          ...button,
          onPress: () => {
            resultResolve('yes');
          },
        },
      ],
      dismissOnOutsideTouch: false,
      dismissOnAndroidHardwareBack: false,
      dismissOnButtonPress: true,
      showCloseButton: true,
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
  messageText: {
    ...font(14, 20, 'medium', 'secondary', 'center'),
    marginTop: rem(16),
    marginHorizontal: rem(45),
  },
  imageStyle: {
    width: rem(230),
    height: rem(54),
    marginTop: 0,
  },
});
