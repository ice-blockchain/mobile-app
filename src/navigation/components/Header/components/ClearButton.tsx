// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {ClearIcon} from '@svg/ClearIcon';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  onPress?: () => void;
};

export const ClearButton = ({
  containerStyle,
  color = COLORS.primaryDark,
  onPress = () => {},
}: Props = {}) => {
  return (
    <View style={containerStyle}>
      <Touchable onPress={onPress} hitSlop={SMALL_BUTTON_HIT_SLOP}>
        <ClearIcon color={color} />
      </Touchable>
    </View>
  );
};
