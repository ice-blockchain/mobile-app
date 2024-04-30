// SPDX-License-Identifier: ice License 1.0

import {EYE_CELLS} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview/components/QRCode/constants';
import {isRTL} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Circle, Svg} from 'react-native-svg';

type Props = {
  size: number;
  matrix: (1 | 0)[][];
  color?: string;
  dotSize?: number;
};

export const QRCodeField = ({size, matrix, color, dotSize = 2}: Props) => {
  const matrixLength = matrix.length;
  const cellSize = size / matrixLength;

  const circles = matrix.flatMap((row, i) => {
    return row.map((column, j) => {
      if (column) {
        if (
          (i < EYE_CELLS && j < EYE_CELLS) ||
          (i >= matrixLength - EYE_CELLS && j < EYE_CELLS) ||
          (i < EYE_CELLS && j >= matrixLength - EYE_CELLS)
        ) {
          return null;
        } else {
          return (
            <Circle
              key={`cell_${i} + ${j}`}
              cx={cellSize * j + cellSize / 2}
              cy={cellSize * i + cellSize / 2}
              fill={color}
              r={dotSize}
            />
          );
        }
      }
    });
  });

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={styles.container}>
      {circles}
    </Svg>
  );
};
const styles = StyleSheet.create({
  container: {
    transform: [{scaleX: isRTL ? -1 : 1}],
  },
});
