// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {
  ShareButton,
  SocialShareButtonType,
} from '@screens/InviteFlow/InviteShare/components/ShareButton';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Share from 'react-native-share';
import {rem, screenWidth} from 'rn-units';

const telegramIcon = require('../../assets/images/telegramIcon.png');
const twitterIcon = require('../../assets/images/twitterIcon.png');
const whatsAppIcon = require('../../assets/images/whatsAppIcon.png');
const instagramIcon = require('../../assets/images/instagramIcon.png');
const emailIcon = require('../../assets/images/emailIcon.png');
const fbIcon = require('../../assets/images/newsfeedIcon.png');
const copyIcon = require('../../assets/images/linkIcon.png');
const moreIcon = require('../../assets/images/moreIcon.png');

const buttons: SocialShareButtonType[] = [
  {
    type: 'Telegram',
    title: 'invite_share.telegram',
    icon: telegramIcon,
    social: Share.Social.TELEGRAM,
  },
  {
    type: 'Twitter',
    title: 'invite_share.twitter',
    icon: twitterIcon,
    social: Share.Social.TWITTER,
  },
  {
    type: 'WhatsApp',
    title: 'invite_share.whatsapp',
    icon: whatsAppIcon,
    social: Share.Social.WHATSAPP,
  },
  {
    type: 'Instagram',
    title: 'invite_share.instagram',
    icon: instagramIcon,
    social: Share.Social.INSTAGRAM,
  },
  {
    type: 'Email',
    title: 'invite_share.email',
    icon: emailIcon,
    social: Share.Social.EMAIL,
  },
  {
    type: 'FB',
    title: 'invite_share.fb',
    icon: fbIcon,
    social: Share.Social.FACEBOOK,
  },
  {
    type: 'CopyLink',
    title: 'invite_share.copy_link',
    icon: copyIcon,
  },
  {
    type: 'More',
    title: 'invite_share.more',
    icon: moreIcon,
  },
];

const ShareCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.buttonsContainer}>
        {buttons.map(button => (
          <ShareButton button={button} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    left: 0,
    bottom: 0,
    width: screenWidth,
    height: rem(242),
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ShareCard;
