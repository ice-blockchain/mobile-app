// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {QRCodeIcon} from '@svg/QRCodeIcon';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
};

export const QRCodeButton = ({onPress}: Props) => {
  return (
    <Touchable
      style={styles.container}
      hitSlop={SMALL_BUTTON_HIT_SLOP}
      onPress={onPress}>
      <QRCodeIcon color={COLORS.secondary} width={rem(24)} height={rem(24)} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: rem(10),
  },
});
