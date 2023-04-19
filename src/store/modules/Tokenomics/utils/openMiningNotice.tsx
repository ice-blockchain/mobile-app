// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {AgreeIcon} from '@svg/AgreeIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export function getMiningNoticeMessageFooter() {
  const footerWithTwitterLink = replaceString(
    t('mining_notice.message_footer'),
    tagRegex('twitter', false),
    (match, index) => (
      <Text
        key={match + index}
        style={styles.socialLink}
        onPress={() => {
          openLinkWithInAppBrowser({url: LINKS.TWITTER_PROFILE_URL});
        }}>
        {match}
      </Text>
    ),
  );
  return replaceString(
    footerWithTwitterLink,
    tagRegex('telegram', false),
    (match, index) => (
      <Text
        key={match + index}
        style={styles.socialLink}
        onPress={() => {
          openLinkWithInAppBrowser({url: LINKS.TELEGRAM_PROFILE_URL});
        }}>
        {match}
      </Text>
    ),
  );
}

export const openMiningNotice = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.error},
      title: t('mining_notice.title'),
      message: (
        <Message
          text={
            <>
              {replaceString(
                t('mining_notice.message'),
                tagRegex('bold', false),
                (match, index) => (
                  <Text key={match + index} style={styles.bold}>
                    {match}
                  </Text>
                ),
              )}
              <Text>{'\n'}</Text>
              <Text>{'\n'}</Text>
              {getMiningNoticeMessageFooter()}
            </>
          }
        />
      ),
      buttons: [
        {
          text: t('button.learn_more'),
          preset: 'outlined',
          onPress: () => {
            openLinkWithInAppBrowser({url: LINKS.BETA_TESTING});
          },
        },
        {
          icon: <AgreeIcon />,
          text: t('button.close'),
        },
      ],
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};

const styles = StyleSheet.create({
  bold: {
    ...font(14, 20, 'bold', 'primaryDark'),
  },
  socialLink: {
    ...font(14, 20, 'bold', 'socialLink'),
    textDecorationLine: 'underline',
  },
});
