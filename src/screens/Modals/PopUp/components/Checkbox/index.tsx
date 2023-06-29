// SPDX-License-Identifier: ice License 1.0

import {windowWidth} from '@constants/styles';
import {SquareCheckboxActiveIcon} from '@svg/SquareCheckboxActiveIcon';
import {SquareCheckboxInactiveIcon} from '@svg/SquareCheckboxInactiveIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  text: string;
  isChecked: boolean;
  onCheckboxPress: () => void;
};

export const Checkbox = ({text, isChecked = false, onCheckboxPress}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onCheckboxPress}>
      <View style={styles.checkbox}>
        <View style={styles.checkBoxContainer}>
          {isChecked ? (
            <SquareCheckboxActiveIcon />
          ) : (
            <SquareCheckboxInactiveIcon />
          )}
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rem(15),
    alignSelf: 'center',
    width: windowWidth * 0.78,
    minHeight: rem(30),
  },
  checkBoxContainer: {
    width: rem(24),
    height: rem(24),
  },
  text: {
    ...font(12, 15, 'medium', 'primaryDark'),
    marginLeft: rem(8),
    flex: 1,
  },
});
