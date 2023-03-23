// SPDX-License-Identifier: ice License 1.0

import {CheckMark} from '@components/CheckMark';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
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

export const LanguageListItem = memo(
  ({language, selected, loading, onSelect}: Props) => {
    const {flag, name} = localeConfig[language];
    return (
      <Touchable style={styles.container} onPress={() => onSelect(language)}>
        <Image style={styles.flag} source={flag} />
        <Text style={styles.languageText} numberOfLines={1}>
          {name}
        </Text>
        {selected && (
          <View style={styles.checkMarkWrapper}>
            {!loading ? <CheckMark /> : <ActivityIndicator />}
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
  },
  flag: {
    marginLeft: rem(16),
    width: rem(20),
    height: rem(14),
    borderRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.black01opacity,
  },
  languageText: {
    flex: 1,
    marginLeft: rem(16),
    ...font(17, 22, 'regular', 'codeFieldText'),
  },
  checkMarkWrapper: {
    width: rem(60),
    alignItems: 'center',
  },
});
