// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {EmojiCategory} from '@screens/modals/EmojiSelector/type';
import {ActivityIcon} from '@svg/ActivityIcon';
import {AnimalIcon} from '@svg/AnimalIcon';
import {DrinkIcon} from '@svg/DrinkIcon';
import {FlagIcon} from '@svg/FlagIcon';
import {ObjectsIcon} from '@svg/ObjectsIcon';
import {RecentIcon} from '@svg/RecentIcon';
import {SmileyIcon} from '@svg/SmileyIcon';
import {SymbolIcon} from '@svg/SymbolIcon';
import {TravelIcon} from '@svg/TravelIcon';
import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const CELL_SIZE = rem(36);

function getCategoryIcon(category: EmojiCategory, isActive: boolean) {
  const color = isActive ? COLORS.primaryLight : COLORS.secondary;
  switch (category) {
    case 'recent':
      return <RecentIcon color={color} />;
    case 'smileys_people':
      return <SmileyIcon color={color} />;
    case 'animals_nature':
      return <AnimalIcon color={color} />;
    case 'food_drink':
      return <DrinkIcon color={color} />;
    case 'activities':
      return <ActivityIcon color={color} />;
    case 'travel_places':
      return <TravelIcon color={color} />;
    case 'objects':
      return <ObjectsIcon color={color} />;
    case 'symbols':
      return <SymbolIcon color={color} />;
    case 'flags':
      return <FlagIcon color={color} />;
  }
}

type Props = {
  isActive: boolean;
  category: EmojiCategory;
  onSetActiveCategory: (activeCategory: EmojiCategory) => void;
};

export function EmojiCategoriesBarCell({
  isActive,
  category,
  onSetActiveCategory,
}: Props) {
  return (
    <Touchable onPress={() => onSetActiveCategory(category)}>
      <Animated.View style={[styles.cell, isActive ? styles.activeCell : null]}>
        {getCategoryIcon(category, isActive)}
      </Animated.View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  cell: {
    height: CELL_SIZE,
    width: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  activeCell: {
    backgroundColor: COLORS.secondaryFaint,
  },
});
