// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {CloseIcon} from '@svg/CloseIcon';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const CloseButton = ({style, onPress}: Props) => {
  return (
    <Touchable hitSlop={MIDDLE_BUTTON_HIT_SLOP} onPress={onPress} style={style}>
      <CloseIcon color={COLORS.secondary} width={rem(12)} height={rem(12)} />
    </Touchable>
  );
};
