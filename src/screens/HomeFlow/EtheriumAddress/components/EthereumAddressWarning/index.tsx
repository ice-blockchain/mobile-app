// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {EthereumIcon} from '@svg/EthereumIcon';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

const CONTAINER_SIZE = rem(54);
const ICON_SIZE = rem(36);

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const EthereumAddressWarning = ({style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <EthereumIcon width={ICON_SIZE} height={ICON_SIZE} />
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
