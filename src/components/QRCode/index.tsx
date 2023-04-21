// SPDX-License-Identifier: ice License 1.0

import {QRCodeEye} from '@components/QRCode/components/QRCodeEye';
import {QRCodeField} from '@components/QRCode/components/QRCodeField';
import {QRCodeLogo} from '@components/QRCode/components/QRCodeLogo';
import {generateQRCodeMatrix} from '@components/QRCode/utils';
import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  input: string;
  size: number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const QRCode = ({
  input,
  size,
  color = COLORS.black,
  containerStyle,
}: Props) => {
  const matrix = generateQRCodeMatrix(input, {errorCorrectionLevel: 'H'});

  return (
    <View style={[styles.container, containerStyle]}>
      <QRCodeField size={size} matrix={matrix} color={color} />
      <QRCodeEye
        size={size}
        matrix={matrix}
        color={color}
        style={styles.eyeTopLeft}
      />
      <QRCodeEye
        size={size}
        matrix={matrix}
        color={color}
        style={styles.eyeTopRight}
      />
      <QRCodeEye
        size={size}
        matrix={matrix}
        color={color}
        style={styles.eyeBottomLeft}
      />
      <QRCodeLogo size={size} matrix={matrix} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  eyeTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  eyeTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: [{rotate: '90deg'}],
  },
  eyeBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: [{rotate: '90deg'}],
  },
});
