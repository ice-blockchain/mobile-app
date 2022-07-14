// SPDX-License-Identifier: BUSL-1.1

import {CheckBox} from '@components/CheckBox';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  language: string;
  selected: boolean;
  onSelect: (value: string) => void;
};

export const LanguageListItem = memo(
  ({language, selected, onSelect}: Props) => {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.languageText,
            selected && styles.languageText_selected,
          ]}
          numberOfLines={1}>
          {t('welcome.page1.title', {locale: language})}
        </Text>
        <CheckBox
          value={selected}
          onValueChange={() => onSelect(language)}
          style={styles.checkbox}
        />
      </View>
    );
  },
);

export const LanguageListItemSeparator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: rem(50),
    alignItems: 'center',
  },
  languageText: {
    fontSize: font(12),
    fontFamily: FONTS.primary.bold,
    color: COLORS.greyText,
    marginLeft: rem(28),
    flex: 1,
  },
  languageText_selected: {
    color: COLORS.darkBlue,
  },
  checkbox: {
    marginHorizontal: rem(25),
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.linkWater,
  },
});
