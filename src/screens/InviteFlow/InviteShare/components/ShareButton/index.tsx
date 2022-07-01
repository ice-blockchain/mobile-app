// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {t} from '@translations/i18n';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Share, {ShareSingleOptions, Social} from 'react-native-share';
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
  social?: Social;
};

interface ShareButtonProps {
  button: SocialShareButtonType;
}
export const ShareButton = ({button}: ShareButtonProps) => {
  const onButtonClick = async () => {
    const baseOptions = {
      message: 'Invitation link:',
      url: 'https://www.google.com/',
    };
    switch (button.type) {
      case 'More':
        break;
      case 'CopyLink':
        break;
      case 'Telegram':
        let telegramOptions: ShareSingleOptions = {
          message: 'Invitation link: https://www.google.com/',
          social: Social.Telegram,
        };
        await Share.shareSingle(telegramOptions);
        break;
      case 'Twitter':
        let twitterOptions: ShareSingleOptions = {
          ...baseOptions,
          social: Social.Twitter,
        };
        await Share.shareSingle(twitterOptions);
        break;
      case 'WhatsApp':
        let whatsappOptions: ShareSingleOptions = {
          ...baseOptions,
          social: Social.Whatsapp,
        };
        await Share.shareSingle(whatsappOptions);
        break;
      case 'Email':
        let emailOptions: ShareSingleOptions = {
          ...baseOptions,
          social: Social.Email,
        };
        await Share.shareSingle(emailOptions);
        break;
      case 'FB':
        let fbOptions: ShareSingleOptions = {
          ...baseOptions,
          social: Social.Facebook,
        };
        await Share.shareSingle(fbOptions);
        break;
      default:
        break;
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
