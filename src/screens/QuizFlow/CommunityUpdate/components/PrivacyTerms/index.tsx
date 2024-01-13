// SPDX-License-Identifier: ice License 1.0

import {CheckBox} from '@components/CheckBox';
import {LINKS} from '@constants/links';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

type Props = {
  onCheckBoxPress: (value: boolean) => void;
  isAgreeWithTerms: boolean;
};

export const PrivacyTerms = ({onCheckBoxPress, isAgreeWithTerms}: Props) => {
  const handlePress = () => {
    openLinkWithInAppBrowser({url: LINKS.TERMS});
  };

  const text = replaceString(
    t('quiz.community_update.terms_privacy'),
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
        <CheckBox checked={isAgreeWithTerms} onValueChange={onCheckBoxPress} />
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
    ...font(14, 19, 'medium', 'primaryDark', 'left'),
    marginRight: rem(20),
    marginLeft: rem(6),
    width: screenWidth * 0.77,
  },
  link: {
    ...font(14, 19, 'regular', 'primaryLight'),
  },
});
