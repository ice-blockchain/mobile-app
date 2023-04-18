// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {commonStyles} from '@constants/styles';
import {Images} from '@images';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Copied,
  CopiedMethods,
} from '@screens/InviteFlow/InviteShare/components/Copied';
import {ShareButton} from '@screens/InviteFlow/InviteShare/components/ShareButton';
import {logError} from '@services/logging';
import {shareSingle} from '@services/share';
import {usernameSelector} from '@store/modules/Account/selectors';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {t} from '@translations/i18n';
import React, {useRef} from 'react';
import {
  Linking,
  Share as ShareMore,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import {openComposer} from 'react-native-email-link';
import Share, {ShareSingleOptions, Social} from 'react-native-share';
import {useSelector} from 'react-redux';
import {isIOS, rem} from 'rn-units';

const buttons = [
  {
    type: 'WhatsApp',
    title: t('invite_share.whatsapp'),
    icon: Images.share.whatsApp,
  },
  {
    type: 'Telegram',
    title: t('invite_share.telegram'),
    icon: Images.share.telegram,
  },
  {
    type: 'Twitter',
    title: t('invite_share.twitter'),
    icon: Images.share.twitter,
  },
  {
    type: 'FB',
    title: t('invite_share.fb'),
    icon: Images.share.facebook,
    social: Share.Social.FACEBOOK,
  },
  {
    type: 'Email',
    title: t('invite_share.email'),
    icon: Images.share.email,
  },
  {
    type: 'Sms',
    title: t('invite_share.sms'),
    icon: Images.share.sms,
  },
  {
    type: 'CopyLink',
    title: t('invite_share.copy_link'),
    icon: Images.share.link,
  },
  {
    type: 'More',
    title: t('invite_share.more'),
    icon: Images.share.more,
  },
] as const;

export const ShareCard = () => {
  const copiedRef = useRef<CopiedMethods>(null);
  const bottomOffset = useBottomOffsetStyle();
  const username = useSelector(usernameSelector);

  const handleSocialButtonPress = async (
    type: typeof buttons[number]['type'],
  ) => {
    const url = `${LINKS.MAIN}@${username}`;
    const baseOptions = {message: t('invite_share.share_message'), url};
    AnalyticsEventLogger.trackInvite({inviteAppType: type});
    try {
      switch (type) {
        case 'More':
          await ShareMore.share({
            message: `${t('invite_share.share_message')} ${url}`,
          });
          break;
        case 'CopyLink':
          Clipboard.setString(url);
          Vibration.vibrate([0, 50]);
          copiedRef.current?.updateVisibleState(true);
          break;
        case 'Telegram':
          await shareSingle({
            social: Social.Telegram,
            message: `${baseOptions.message} ${url}`,
          });
          break;
        case 'Twitter':
          await shareSingle({
            ...baseOptions,
            social: Social.Twitter,
          });
          break;
        case 'WhatsApp':
          await shareSingle({
            ...baseOptions,
            social: Social.Whatsapp,
          });
          break;
        case 'Email':
          const emailOptions: ShareSingleOptions = {
            ...baseOptions,
            social: Social.Email,
          };
          await openComposer({
            subject: emailOptions.subject,
            body: `${emailOptions.message} ${url}`,
          });
          break;
        case 'FB':
          await shareSingle({
            ...baseOptions,
            social: Social.Facebook,
          });
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
      logError(error);
    }
  };

  return (
    <View
      style={[
        styles.shareCard,
        commonStyles.baseSubScreen,
        bottomOffset.current,
      ]}>
      <Copied ref={copiedRef} />
      <View style={styles.buttonsContainer}>
        {buttons.map(button => (
          <ShareButton
            title={button.title}
            icon={button.icon}
            key={button.type}
            onPress={() => handleSocialButtonPress(button.type)}
            style={styles.button}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginVertical: rem(12),
    backgroundColor: COLORS.white,
  },
  button: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rem(24),
  },
});
