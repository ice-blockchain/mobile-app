// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {CloseIcon} from '@svg/CloseIcon';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const CloseButton = ({style, onPress}: Props) => {
  const navigation = useNavigation();
  return (
    <Touchable
      hitSlop={MIDDLE_BUTTON_HIT_SLOP}
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          navigation.goBack();
        }
      }}
      style={style}>
      <CloseIcon color={COLORS.black} width={rem(12)} height={rem(12)} />
    </Touchable>
  );
};
