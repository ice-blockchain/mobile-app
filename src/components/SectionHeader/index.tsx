// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title: string;
  action?: string | ReactNode;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const SECTION_HEADER_HEIGHT = rem(42);

export const SectionHeader = memo(
  ({title, action, onActionPress, style}: Props) => {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.titleText}>{title.toUpperCase()}</Text>
        {typeof action === 'string' ? (
          <Touchable hitSlop={MIDDLE_BUTTON_HIT_SLOP} onPress={onActionPress}>
            <Text style={styles.actionText}>{action}</Text>
          </Touchable>
        ) : (
          action
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    justifyContent: 'space-between',
    paddingTop: rem(24),
    height: SECTION_HEADER_HEIGHT,
  },
  titleText: {
    ...font(15, 20, 'black', 'primaryDark'),
  },
  actionText: {
    ...font(12.5, 15, 'medium', 'primaryDark'),
  },
});
