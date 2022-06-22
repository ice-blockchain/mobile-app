// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {CheckMarkIcon} from '@svg/CheckMarkIcon';
import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  LabelComponent?: ReactNode;
};

export const CheckBox = ({value, onValueChange, LabelComponent}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onValueChange(!value)}>
        {LabelComponent}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onValueChange(!value)}>
        <View
          style={[
            styles.checkFrame,
            {borderColor: value ? COLORS.shamrock : COLORS.white},
          ]}>
          {value ? (
            <CheckMarkIcon
              style={styles.checkIcon}
              width={rem(8)}
              height={rem(7)}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkFrame: {
    width: rem(14),
    height: rem(14),
    borderWidth: rem(2),
    borderRadius: rem(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: rem(10),
    marginLeft: rem(10),
  },
  checkIcon: {
    width: rem(8),
    height: rem(7),
  },
});
