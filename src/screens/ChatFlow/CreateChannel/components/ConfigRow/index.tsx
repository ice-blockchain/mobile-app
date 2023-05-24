// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {ChevronIcon} from '@svg/ChevronIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

interface Props {
  style?: StyleProp<ViewStyle>;
  Icon: React.FC<{width: number; height: number; color: string}>;
  title: string;
  value: string | number;
  onPress(): void;
}

export const ConfigRow = ({style, Icon, title, value, onPress}: Props) => {
  return (
    <Touchable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon width={rem(24)} height={rem(24)} color={COLORS.primaryLight} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.value}>{value}</Text>

      <ChevronIcon style={styles.arrow} width={rem(20)} height={rem(20)} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: rem(44),
    height: rem(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(12),
    backgroundColor: COLORS.aliceBlue,
  },
  title: {
    marginLeft: rem(12),
    flex: 1,
    ...font(16, 19.2, '900', 'primaryDark'),
  },
  value: {
    marginLeft: rem(12),
    ...font(16, 19.2, '400', 'primaryLight'),
  },
  arrow: {
    marginLeft: rem(8),
  },
});
