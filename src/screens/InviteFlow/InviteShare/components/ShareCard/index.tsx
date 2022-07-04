// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import Copied from '@screens/InviteFlow/InviteShare/components/Copied';
import {
  ShareButton,
  SocialShareButtonType,
  SocialType,
} from '@screens/InviteFlow/InviteShare/components/ShareButton';
import React, {useRef} from 'react';
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
  },
  {
    type: 'Twitter',
    title: 'invite_share.twitter',
    icon: twitterIcon,
  },
  {
    type: 'WhatsApp',
    title: 'invite_share.whatsapp',
    icon: whatsAppIcon,
  },
  {
    type: 'Instagram',
    title: 'invite_share.instagram',
    icon: instagramIcon,
  },
  {
    type: 'Email',
    title: 'invite_share.email',
    icon: emailIcon,
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
  const copiedRef = useRef<Copied>(null);

  return (
    <View style={styles.fullCard}>
      <Copied ref={copiedRef} />
      <View style={styles.shareCard}>
        <View style={styles.buttonsContainer}>
          {buttons.map(button => (
            <ShareButton
              button={button}
              key={button.type}
              onPress={(type: SocialType) => {
                if (type === 'CopyLink' && copiedRef) {
                  copiedRef.current?.updateVisibleState(true);
                }
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullCard: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 0,
    bottom: 0,
    width: screenWidth,
    height: rem(292),
  },
  shareCard: {
    width: screenWidth,
    height: rem(242),
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ShareCard;
