// SPDX-License-Identifier: ice License 1.0

import {CheckBox} from '@components/CheckBox';
import {LINKS} from '@constants/links';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onCheckBoxPress: (value: boolean) => void;
  termsAccepted: boolean;
};

export const PrivacyTerms = ({onCheckBoxPress, termsAccepted}: Props) => {
  const handlePress = () => {
    openLinkWithInAppBrowser({url: LINKS.TERMS});
  };

  const text = replaceString(
    t('quiz.intro.terms_privacy'),
    tagRegex('link', false),
    (match, index) => {
      return (
        <Text key={match + index} style={styles.link} onPress={handlePress}>
          {match}
        </Text>
      );
    },
  );

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox checked={termsAccepted} onValueChange={onCheckBoxPress} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: rem(30),
    flexDirection: 'row',
  },
  checkboxContainer: {
    width: rem(36),
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    ...font(14, 19, 'medium', 'primaryDark', 'left'),
    marginEnd: rem(20),
  },
  link: {
    ...font(14, 19, 'regular', 'primaryLight'),
  },
});
