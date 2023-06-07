// SPDX-License-Identifier: ice License 1.0

import {SEARCH_INPUT_HEIGHT, SearchInput} from '@components/Inputs/SearchInput';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, HIT_SLOP} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {
  CATEGORIES_BAR_HEIGHT,
  EmojiCategoriesBar,
} from '@screens/Modals/EmojiSelector/components/EmojiCategoriesBar';
import {EmojiCategory} from '@screens/Modals/EmojiSelector/type';
import {CloseModalIcon} from '@svg/CloseModalIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {isIOS, rem} from 'rn-units';

type Props = {
  categories: EmojiCategory[];
  activeCategory: EmojiCategory;
  onSetActiveCategory: (activeCategory: EmojiCategory) => void;
  setSearchValue: (searchValue: string) => void;
  scrollY: Animated.SharedValue<number>;
};

const CLOSE_BUTTON_SIZE = rem(24);
const TOP_CONTAINER_HEIGHT = rem(20) + CLOSE_BUTTON_SIZE;
const SHADOW_PADDING = rem(4);
const PADDING_BOTTOM = rem(8);
const SEARCH_MARGIN_TOP = rem(16);
const TOTAL_HEIGHT =
  SEARCH_INPUT_HEIGHT +
  SEARCH_MARGIN_TOP +
  CATEGORIES_BAR_HEIGHT +
  TOP_CONTAINER_HEIGHT +
  SHADOW_PADDING +
  PADDING_BOTTOM;

export function EmojiSelectorHeader({
  categories,
  onSetActiveCategory,
  activeCategory,
  setSearchValue,
  scrollY,
}: Props) {
  const navigation = useNavigation();
  const focused = useSharedValue(0);
  const [height, setHeight] = useState(0);
  const animatedContainerStyle = useAnimatedStyle(
    () => ({
      height: interpolate(
        focused.value,
        [0, 1],
        [TOTAL_HEIGHT, TOTAL_HEIGHT - CATEGORIES_BAR_HEIGHT],
        'clamp',
      ),
    }),
    [height],
  );
  const animatedShadowContainerStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(
            focused.value,
            [0, 1],
            [0, -CATEGORIES_BAR_HEIGHT],
            'clamp',
          ),
        },
      ],
      ...(isIOS
        ? {
            shadowColor: interpolateColor(
              scrollY.value,
              [0, 100],
              [COLORS.white, COLORS.mariner],
            ),
          }
        : {
            elevation: interpolate(scrollY.value, [0, 100], [0, 4], 'clamp'),
          }),
    }),
    [],
  );
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(
            focused.value,
            [0, 1],
            [0, CATEGORIES_BAR_HEIGHT],
            'clamp',
          ),
        },
      ],
    }),
    [],
  );
  return (
    <Animated.View
      style={[styles.container, animatedContainerStyle]}
      onLayout={({nativeEvent}) => setHeight(nativeEvent.layout.height)}>
      <Animated.View
        style={[
          styles.shadowContainer,
          commonStyles.shadow,
          animatedShadowContainerStyle,
        ]}>
        <Animated.View style={animatedStyle}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>{t('emojis_selector.title')}</Text>
            <Touchable
              hitSlop={HIT_SLOP}
              onPress={navigation.goBack}
              style={styles.closeButton}>
              <CloseModalIcon />
            </Touchable>
          </View>
          <EmojiCategoriesBar
            activeCategory={activeCategory}
            categories={categories}
            onSetActiveCategory={onSetActiveCategory}
          />
        </Animated.View>
        <SearchInput
          onChangeText={setSearchValue}
          placeholder={t('button.search')}
          containerStyle={styles.search}
          focused={focused}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: SHADOW_PADDING,
  },
  shadowContainer: {
    backgroundColor: COLORS.white,
    paddingBottom: PADDING_BOTTOM,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: rem(16),
    height: TOP_CONTAINER_HEIGHT,
    backgroundColor: COLORS.white,
  },
  title: {
    ...font(14, 17, 'semibold', 'primaryDark'),
    textTransform: 'uppercase',
  },
  closeButton: {
    backgroundColor: COLORS.wildSand,
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    borderRadius: CLOSE_BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    marginTop: SEARCH_MARGIN_TOP,
    marginHorizontal: rem(16),
  },
});
