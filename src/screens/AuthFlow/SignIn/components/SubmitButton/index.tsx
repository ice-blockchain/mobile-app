// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton, PrimaryButtonProps} from '@components/PrimaryButton';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const SubmitButton = (props: PrimaryButtonProps) => {
  return <PrimaryButton style={styles.button} {...props} />;
};

const styles = StyleSheet.create({
  button: {
    marginTop: rem(24),
    height: rem(52),
    alignSelf: 'center',
    paddingHorizontal: rem(54),
  },
});
