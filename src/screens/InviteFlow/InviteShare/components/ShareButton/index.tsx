// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {t} from '@translations/i18n';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import Share from 'react-native-share';
import {font, rem, screenWidth} from 'rn-units';

const BUTTON_LEFT_OFFSET = 32;
const BUTTON_SIDE_DIMENSTION = (screenWidth - BUTTON_LEFT_OFFSET * 5) / 4;

export type SocialType =
  | 'Telegram'
  | 'Twitter'
  | 'WhatsApp'
  | 'Instagram'
  | 'Email'
  | 'FB'
  | 'CopyLink'
  | 'More';

export type SocialShareButtonType = {
  type: SocialType;
  title: string;
  icon: number;
  social?: string;
};

interface ShareButtonProps {
  button: SocialShareButtonType;
}
export const ShareButton = ({button}: ShareButtonProps) => {
  const onButtonClick = async () => {
    if (button.type === 'More') {
    } else if (button.type === 'CopyLink') {
    } else {
      //   const shareOptions = {
      //     title: 'Share via',
      //     message: 'some message',
      //     url: 'some share url',
      //     appId: '',
      //     social: button.social || '',
      //   };
      //   await Share.shareSingle(shareOptions);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onButtonClick}>
      <Image style={styles.icon} source={button.icon} />
      <Text style={styles.buttonTitle}>{t(button.title)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIDE_DIMENSTION,
    marginLeft: BUTTON_LEFT_OFFSET,
    marginTop: 24,
  },
  icon: {
    width: BUTTON_SIDE_DIMENSTION,
    height: BUTTON_SIDE_DIMENSTION,
  },
  buttonTitle: {
    marginTop: rem(8),
    alignSelf: 'center',
    color: COLORS.greyText,
    fontSize: font(11),
    fontFamily: FONTS.primary.regular,
  },
});
