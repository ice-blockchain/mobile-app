// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

interface Props extends ViewProps {
  children: ReactNode;
  innerStyle?: StyleProp<ViewStyle>;
  outerStyle?: StyleProp<ViewStyle>;
}

const BORDER_RADIUS = rem(20);

export const WalkthroughElementContainer = ({
  children,
  innerStyle,
  outerStyle,
  ...viewProps
}: Props) => {
  return (
    <View style={[styles.outerContainer, outerStyle]} {...viewProps}>
      <View style={[styles.innerContainer, innerStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
  },
  innerContainer: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
  },
});
