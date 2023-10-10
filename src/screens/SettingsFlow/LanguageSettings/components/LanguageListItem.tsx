// SPDX-License-Identifier: ice License 1.0

import {CheckMark} from '@components/CheckMark';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {isRTL} from '@translations/i18n';
import {localeConfig, SupportedLocale} from '@translations/localeConfig';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  language: SupportedLocale;
  selected: boolean;
  loading: boolean;
  onSelect: (value: SupportedLocale) => void;
};

const FLAG_WIDTH = rem(21);
const FLAG_HEIGHT = (FLAG_WIDTH / 20) * 14;

export const LanguageListItem = memo(
  ({language, selected, loading, onSelect}: Props) => {
    const {flag, name} = localeConfig[language];
    return (
      <Touchable style={styles.container} onPress={() => onSelect(language)}>
        <View style={styles.langContainer}>
          <Image style={styles.flag} source={flag} />
          <Text style={styles.languageText} numberOfLines={1}>
            {name}
          </Text>
        </View>
        {selected && (
          <View style={styles.checkMarkWrapper}>
            {loading ? <ActivityIndicator /> : <CheckMark />}
          </View>
        )}
      </Touchable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rem(10),
    paddingLeft: rem(6),
  },
  langContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    marginLeft: rem(12),
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.black01opacity,
  },
  languageText: {
    flex: isRTL ? 0 : 1,
    marginLeft: rem(16),
    ...font(17, 22, 'regular', 'gunmetalGrey'),
  },
  checkMarkWrapper: {
    width: rem(60),
    alignItems: 'center',
  },
});
