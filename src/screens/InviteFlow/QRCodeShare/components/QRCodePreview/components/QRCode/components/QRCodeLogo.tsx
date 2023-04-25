// SPDX-License-Identifier: ice License 1.0

import {LogoIcon} from '@svg/LogoIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  size: number;
  matrix: (1 | 0)[][];
  color?: string;
  logoSizePercentage?: number;
};

export const QRCodeLogo = ({
  size,
  matrix,
  color,
  logoSizePercentage = 30,
}: Props) => {
  const matrixLength = matrix.length;
  const cellSize = size / matrixLength;
  const approxLogoCells = Math.floor((matrixLength * logoSizePercentage) / 100);
  const logoCells =
    (matrixLength - approxLogoCells) % 2 === 0
      ? approxLogoCells
      : approxLogoCells + 1;
  const logoSize = cellSize * logoCells;

  return (
    <View style={[styles.container, {width: logoSize, height: logoSize}]}>
      <LogoIcon color={color} width={'70%'} height={'70%'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
