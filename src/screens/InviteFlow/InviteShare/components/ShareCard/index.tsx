// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {commonStyles} from '@constants/styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Copied,
  CopiedMethods,
} from '@screens/InviteFlow/InviteShare/components/Copied';
import {
  ShareButton,
  SocialShareButtonType,
} from '@screens/InviteFlow/InviteShare/components/ShareButton';
import {SocialType} from '@screens/InviteFlow/InviteShare/components/ShareButton/types';
import {logError} from '@services/logging';
import {usernameSelector} from '@store/modules/Account/selectors';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';
import React, {useRef} from 'react';
import {
  Linking,
  Share as ShareMore,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import {openComposer} from 'react-native-email-link';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Share, {ShareSingleOptions, Social} from 'react-native-share';
import {useSelector} from 'react-redux';
import {isAndroid, isIOS, rem} from 'rn-units';

const telegramIcon = require('../../assets/images/telegramIcon.png');
const twitterIcon = require('../../assets/images/twitterIcon.png');
const whatsAppIcon = require('../../assets/images/whatsAppIcon.png');
const emailIcon = require('../../assets/images/emailIcon.png');
const fbIcon = require('../../assets/images/newsfeedIcon.png');
const copyIcon = require('../../assets/images/linkIcon.png');
const moreIcon = require('../../assets/images/moreIcon.png');
const smsIcon = require('../../assets/images/smsIcon.png');

const buttons: SocialShareButtonType[] = [
  {
    type: 'WhatsApp',
    title: t('invite_share.whatsapp'),
    icon: whatsAppIcon,
  },
  {
    type: 'Telegram',
    title: t('invite_share.telegram'),
    icon: telegramIcon,
  },
  {
    type: 'Twitter',
    title: t('invite_share.twitter'),
    icon: twitterIcon,
  },
  {
    type: 'FB',
    title: t('invite_share.fb'),
    icon: fbIcon,
    social: Share.Social.FACEBOOK,
  },
  {
    type: 'Email',
    title: t('invite_share.email'),
    icon: emailIcon,
  },
  {
    type: 'Sms',
    title: t('invite_share.sms'),
    icon: smsIcon,
  },
  {
    type: 'CopyLink',
    title: t('invite_share.copy_link'),
    icon: copyIcon,
  },
  {
    type: 'More',
    title: t('invite_share.more'),
    icon: moreIcon,
  },
];

const ShareCard = () => {
  const copiedRef = useRef<CopiedMethods>(null);
  const {bottom: bottomInset} = useSafeAreaInsets();
  const username = useSelector(usernameSelector);

  const handleSocialButtonPress = async (type: SocialType) => {
    const url = `${LINKS.MAIN}@${username}`;
    const baseOptions = {message: t('invite_share.share_message'), url};
    AnalyticsEventLogger.trackInvite({inviteAppType: type});
    try {
      switch (type) {
        case 'More':
          let moreOptions = {
            message: `${t('invite_share.share_message')} ${url}`,
          };
          await ShareMore.share(moreOptions);
          break;
        case 'CopyLink':
          Clipboard.setString(url);
          Vibration.vibrate([0, 50]);
          copiedRef.current?.updateVisibleState(true);
          break;
        case 'Telegram':
          let telegramOptions: ShareSingleOptions = {
            social: Social.Telegram,
            message: `${baseOptions.message} ${url}`,
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

          await openComposer({
            subject: emailOptions.subject,
            body: `${emailOptions.message} ${url}`,
          });
          break;
        case 'FB':
          let fbOptions: ShareSingleOptions = {
            ...baseOptions,
            social: Social.Facebook,
          };
          await Share.shareSingle(fbOptions);
          break;
        case 'Sms':
          const divider = isIOS ? '&' : '?';

          const path = `sms:${divider}body=${baseOptions.message} ${url}`;

          await Linking.openURL(path);
          break;

        default:
          break;
      }
    } catch (error) {
      if (isShareProviderNotInstalled(error)) {
        return;
      }
      logError(error);
    }
  };

  return (
    <View style={[styles.fullCard, {height: rem(283) + bottomInset}]}>
      <Copied ref={copiedRef} />
      <View
        style={[
          styles.shareCard,
          commonStyles.baseSubScreen,
          {height: rem(239) + bottomInset},
        ]}>
        <View style={styles.buttonsContainer}>
          {buttons.map(button => (
            <ShareButton
              button={button}
              key={button.type}
              onPress={handleSocialButtonPress}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const isShareProviderNotInstalled = (error: unknown) => {
  if (
    isAndroid &&
    checkProp(error, 'error') &&
    typeof error.error === 'string' &&
    error.error.includes('No Activity found to handle Intent')
  ) {
    return true;
  } else if (
    isIOS &&
    checkProp(error, 'code') &&
    error.code === 'ECOM.RNSHARE1'
  ) {
    return true;
  }
  return false;
};

const styles = StyleSheet.create({
  fullCard: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  shareCard: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: rem(12),
  },
});

export default ShareCard;
