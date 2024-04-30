// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Copied,
  CopiedMethods,
} from '@screens/InviteFlow/InviteShare/components/Copied';
import {
  ShareButton,
  ShareCard,
} from '@screens/InviteFlow/InviteShare/components/InviteShareCard/components/ShareCard';
import {logError} from '@services/logging';
import {shareSingle, shareSMS, Social} from '@services/share';
import {usernameSelector} from '@store/modules/Account/selectors';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {t} from '@translations/i18n';
import {hapticFeedback} from '@utils/device';
import {buildUsernameLink} from '@utils/username';
import React, {createRef} from 'react';
import {Share as ShareMore} from 'react-native';
import {openComposer} from 'react-native-email-link';
import {useSelector} from 'react-redux';

const buttons: ShareButton<{url: string; message: string}>[] = [
  {
    type: 'WhatsApp',
    title: t('invite_share.whatsapp'),
    icon: Images.share.whatsApp,
    onPress: ({url, message}) =>
      shareSingle({url, message, social: Social.Whatsapp}),
  },
  {
    type: 'Telegram',
    title: t('invite_share.telegram'),
    icon: Images.share.telegram,
    onPress: ({url, message}) =>
      shareSingle({message: `${message} ${url}`, social: Social.Telegram}),
  },
  {
    type: 'Twitter',
    title: t('invite_share.twitter'),
    icon: Images.share.twitter,
    onPress: ({url, message}) =>
      shareSingle({url, message, social: Social.Twitter}),
  },
  {
    type: 'FB',
    title: t('invite_share.fb'),
    icon: Images.share.facebook,
    onPress: ({url, message}) =>
      shareSingle({url, message, social: Social.Facebook}),
  },
  {
    type: 'Email',
    title: t('invite_share.email'),
    icon: Images.share.email,
    onPress: async ({url, message}) => {
      openComposer({
        subject: t('invite_share.share_subject'),
        body: `${message} ${url}`,
      });
    },
  },
  {
    type: 'Sms',
    title: t('invite_share.sms'),
    icon: Images.share.sms,
    onPress: async ({url, message}) => {
      await shareSMS('', `${message} ${url}`);
    },
  },
  {
    type: 'CopyLink',
    title: t('invite_share.copy_link'),
    icon: Images.share.link,
    onPress: async ({url}) => {
      Clipboard.setString(url);
      hapticFeedback();
      copiedRef.current?.updateVisibleState(true);
    },
  },
  {
    type: 'More',
    title: t('invite_share.more'),
    icon: Images.share.more,
    onPress: async ({url}) => {
      await ShareMore.share({
        message: `${t('invite_share.share_message')} ${url}`,
      });
    },
  },
];

const copiedRef = createRef<CopiedMethods>();

export const InviteShareCard = () => {
  const username = useSelector(usernameSelector);

  const handleSocialButtonPress = (button: typeof buttons[number]) => {
    AnalyticsEventLogger.trackInvite({inviteAppType: button.type});
    button
      .onPress({
        message: t('invite_share.share_message'),
        url: buildUsernameLink(username),
      })
      .catch(logError);
  };

  return (
    <ShareCard buttons={buttons} onButtonPress={handleSocialButtonPress}>
      <Copied ref={copiedRef} />
    </ShareCard>
  );
};
