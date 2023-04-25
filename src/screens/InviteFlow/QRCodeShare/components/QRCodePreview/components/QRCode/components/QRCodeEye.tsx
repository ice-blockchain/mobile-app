// SPDX-License-Identifier: ice License 1.0

import {EYE_CELLS} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview/components/QRCode/constants';
import {QRCodeEyeIcon} from '@svg/QRCodeEyeIcon';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  size: number;
  matrix: (1 | 0)[][];
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const QRCodeEye = ({size, matrix, color, style}: Props) => {
  const matrixLength = matrix.length;
  const eyeSize = (size / matrixLength) * EYE_CELLS;
  return (
    <QRCodeEyeIcon
      color={color}
      width={eyeSize}
      height={eyeSize}
      style={style}
    />
  );
};
