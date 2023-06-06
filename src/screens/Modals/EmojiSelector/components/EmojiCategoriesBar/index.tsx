// SPDX-License-Identifier: ice License 1.0

import {
  CELL_SIZE,
  EmojiCategoriesBarCell,
} from '@screens/modals/EmojiSelector/components/EmojiCategoriesBar/components/EmojiCategoriesBarCell';
import {EmojiCategory} from '@screens/modals/EmojiSelector/type';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  activeCategory: EmojiCategory;
  categories: EmojiCategory[];
  onSetActiveCategory: (activeCategory: EmojiCategory) => void;
};

export function EmojiCategoriesBar({
  categories,
  onSetActiveCategory,
  activeCategory,
}: Props) {
  return (
    <View style={styles.row}>
      {categories.map(category => (
        <EmojiCategoriesBarCell
          isActive={activeCategory === category}
          key={category}
          category={category}
          onSetActiveCategory={onSetActiveCategory}
        />
      ))}
    </View>
  );
}
const PADDING_TOP = rem(20);
export const CATEGORIES_BAR_HEIGHT = CELL_SIZE + PADDING_TOP;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: PADDING_TOP,
    paddingHorizontal: rem(16),
    justifyContent: 'space-evenly',
  },
});
