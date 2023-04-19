// SPDX-License-Identifier: ice License 1.0

import {ShareButton, ShareCard} from '@components/Cards/ShareCard';
import {Images} from '@images';
import {logError} from '@services/logging';
import {shareSingle} from '@services/share';
import {t} from '@translations/i18n';
import React from 'react';
import {Linking, Share as ShareMore} from 'react-native';
import {openComposer} from 'react-native-email-link';
import {Social} from 'react-native-share';
import {isIOS} from 'rn-units';

const buttons: ShareButton<{url: string}>[] = [
  {
    type: 'Download',
    title: t('invite_share.download'),
    icon: Images.share.download,
    onPress: async ({url}) => console.log('download', url),
  },
  {
    type: 'WhatsApp',
    title: t('invite_share.whatsapp'),
    icon: Images.share.whatsApp,
    onPress: ({url}) => shareSingle({url, social: Social.Whatsapp}),
  },
  {
    type: 'Telegram',
    title: t('invite_share.telegram'),
    icon: Images.share.telegram,
    onPress: ({url}) => shareSingle({url, social: Social.Telegram}),
  },
  {
    type: 'Twitter',
    title: t('invite_share.twitter'),
    icon: Images.share.twitter,
    onPress: ({url}) => shareSingle({url, social: Social.Twitter}),
  },
  {
    type: 'FB',
    title: t('invite_share.fb'),
    icon: Images.share.facebook,
    onPress: ({url}) => shareSingle({url, social: Social.Facebook}),
  },
  {
    type: 'Email',
    title: t('invite_share.email'),
    icon: Images.share.email,
    onPress: async ({url}) => {
      openComposer({body: url});
    },
  },
  {
    type: 'Sms',
    title: t('invite_share.sms'),
    icon: Images.share.sms,
    onPress: ({url}) => {
      const divider = isIOS ? '&' : '?';
      return Linking.openURL(`sms:${divider}body=${url}`);
    },
  },
  {
    type: 'More',
    title: t('invite_share.more'),
    icon: Images.share.more,
    onPress: async ({url}) => {
      ShareMore.share({url});
    },
  },
];

export const QRShareCard = () => {
  const onButtonPress = (button: typeof buttons[number]) => {
    button.onPress({url: 'https://foo.com'}).catch(logError);
  };

  return <ShareCard buttons={buttons} onButtonPress={onButtonPress} />;
};
