// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {BscIcon} from '@svg/BscIcon';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

const CONTAINER_SIZE = rem(54);
const ICON_SIZE = rem(36);

type Props = {
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
  iconSize?: number;
};

export const FramedBscIcon = ({
  style,
  iconColor,
  iconSize = ICON_SIZE,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <BscIcon width={iconSize} height={iconSize} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    borderRadius: rem(15),
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
