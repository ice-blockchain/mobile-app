// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

export const PrivacyTerms = ({containerStyle}: Props) => {
  const handlePress = (url: string) => () => {
    openLinkWithInAppBrowser({url});
  };

  const text = replaceString(
    t('signIn.privacy'),
    tagRegex('link', false),
    (match, index) => {
      return (
        <Text
          key={match + index}
          style={styles.link}
          onPress={
            index === 0 ? handlePress(LINKS.TERMS) : handlePress(LINKS.PRIVACY)
          }>
          {match}
        </Text>
      );
    },
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...font(12, 16, 'regular', 'primaryDark', 'center'),
    marginHorizontal: rem(40),
  },
  link: {
    ...font(12, 16, 'regular', 'primaryLight'),
  },
});
