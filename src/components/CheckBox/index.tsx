// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {CheckMarkIcon} from '@svg/CheckMarkIcon';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export const CheckBox = ({value, onValueChange, style}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      hitSlop={SMALL_BUTTON_HIT_SLOP}>
      <View style={[styles.checkFrame, style]}>
        {value ? (
          <CheckMarkIcon
            width={rem(13)}
            height={rem(10)}
            fill={COLORS.persianBlue}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkFrame: {
    width: rem(25),
    height: rem(25),
    borderRadius: rem(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.linkWater,
  },
});
