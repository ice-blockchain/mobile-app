// SPDX-License-Identifier: ice License 1.0

import {ROW_HEIGHT} from '@screens/EmojiSelector/components/EmojiRow';
import {EmojiCategory} from '@screens/EmojiSelector/type';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  category: EmojiCategory;
};

export function EmojiSelectorSectionHeader({category}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {t(`emojis_selector.categories.${category}`)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ROW_HEIGHT,
    justifyContent: 'flex-end',
  },
  text: {
    paddingHorizontal: rem(16),
    textTransform: 'uppercase',
    ...font(12, 14, 'medium', 'secondary'),
  },
});
