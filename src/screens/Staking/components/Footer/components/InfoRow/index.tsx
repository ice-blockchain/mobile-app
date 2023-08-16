// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
  Icon: React.FC<SvgProps>;
  label: string;
  value: string | number;
  /**
   * Unit to be displayed after the value.
   * Example: 'years', 'ICE', 'km'
   */
  unit: string | ReactNode;
};

export const InfoRow = memo(({style, Icon, label, value, unit}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Icon width={rem(18)} height={rem(18)} color={COLORS.primaryLight} />
      <Text style={styles.text}>
        {`${label.toLocaleUpperCase()}: `}
        <Text style={styles.value}>
          {value} {unit}
        </Text>
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingVertical: rem(8),
    paddingHorizontal: rem(10),
    minHeight: rem(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(16),
    backgroundColor: COLORS.aliceBlue,
  },
  text: {
    marginLeft: rem(6),
    ...font(14, 16.8, 'medium', 'primaryLight'),
  },
  value: {
    ...font(17, 20.4, 'bold', 'primaryLight'),
  },
});
