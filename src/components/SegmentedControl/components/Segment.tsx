// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  segment: {
    text?: string;
    renderText?: (active: boolean) => ReactNode;
    key: string;
  };
  active: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const Segment = ({segment, active, style, onPress}: Props) => {
  return (
    <Touchable
      key={segment.key}
      onPress={onPress}
      style={[styles.segment, style]}>
      {typeof segment.renderText === 'function' ? (
        segment.renderText(active)
      ) : (
        <Text
          style={[
            styles.text,
            active ? styles.activeText : styles.inactiveText,
          ]}>
          {segment.text ?? ''}
        </Text>
      )}
    </Touchable>
  );
};

export const styles = StyleSheet.create({
  segment: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    marginTop: rem(4),
    ...font(17, 20, 'semibold'),
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.secondary,
  },
});
