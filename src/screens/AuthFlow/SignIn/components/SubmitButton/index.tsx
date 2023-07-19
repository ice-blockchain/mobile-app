// SPDX-License-Identifier: ice License 1.0

import {
  PrimaryButton,
  PrimaryButtonProps,
} from '@components/Buttons/PrimaryButton';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const SubmitButton = ({style, ...props}: PrimaryButtonProps) => {
  return (
    <PrimaryButton
      style={[styles.button, style]}
      textStyle={styles.buttonTitle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: rem(24),
    height: rem(52),
    alignSelf: 'center',
    paddingHorizontal: rem(54),
    textAlign: 'center',
  },
  buttonTitle: {
    textAlign: 'center',
  },
});
