// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {LayoutChangeEvent, StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units/index';

type Props = {
  onButtonLayout?: (event: LayoutChangeEvent) => void;
  onPress: () => void;
};

export function ReadMoreButton({onButtonLayout, onPress}: Props) {
  return (
    <Touchable
      hitSlop={SMALL_BUTTON_HIT_SLOP}
      style={styles.readMore}
      onLayout={onButtonLayout}
      onPress={onPress}>
      <Text style={styles.readMoreText}>{t('news.read_more')}</Text>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  readMore: {
    paddingVertical: rem(6),
    paddingHorizontal: rem(16),
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
  },
  readMoreText: {
    ...font(15, 20, 'semibold', 'primaryLight'),
  },
});
