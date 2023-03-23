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
import {rem} from 'rn-units';

export const openEarlyAccess = () => {
  let resultResolve: (value: 'yes' | 'no') => void;
  const resultPromise = new Promise<'yes' | 'no'>(r => (resultResolve = r));

  const message = replaceString(
    t('early_access.message_part1'),
    tagRegex('bold', false),
    (match, index) => (
      <Text key={match + index} style={styles.bold}>
        {match}
      </Text>
    ),
  );

  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.earlyAccess},
      imageStyle: styles.imageStyle,
      title: t('early_access.title'),
      message: (
        <Message
          text={
            <>
              {message}
              <Text>{'\n'}</Text>
              {t('early_access.message_part2')}
              <Text>{'\n'}</Text>
              <Text>{'\n'}</Text>
              {t('early_access.message_part3')}
            </>
          }
        />
      ),
      showCheckbox: true,
      checkboxText: t('early_access.checkbox_description'),
      dismissOnOutsideTouch: false,
      dismissOnAndroidHardwareBack: false,
      dismissOnButtonPress: false,
      buttons: [
        {
          text: t('button.learn_more'),
          preset: 'outlined',
          onPress: () => {
            openLinkWithInAppBrowser({url: LINKS.EARLY_ACCESS});
          },
        },
        {
          icon: <AgreeIcon />,
          text: t('button.agree'),
          onCheckboxPress: (checkboxChecked: boolean) =>
            resultResolve(checkboxChecked ? 'yes' : 'no'),
        },
      ],
    },
  });

  return resultPromise;
};

const styles = StyleSheet.create({
  bold: {
    ...font(14, 20, 'bold', 'primaryDark'),
  },
  button: {
    flex: 1,
    marginHorizontal: rem(52),
  },
  imageStyle: {
    marginTop: -rem(73),
    width: rem(200),
    height: rem(207),
  },
});
