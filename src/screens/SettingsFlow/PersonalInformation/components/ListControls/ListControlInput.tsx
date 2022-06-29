// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ListControlBase} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import React, {memo} from 'react';
import {StyleSheet, TextInputProps} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

type Props = {
  label: string;
} & TextInputProps;

export const ListControlInput = memo(({label, ...inputProps}: Props) => {
  return (
    <ListControlBase label={label}>
      <TextInput style={styles.input} {...inputProps} />
    </ListControlBase>
  );
});

const styles = StyleSheet.create({
  container: {
    height: rem(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: COLORS.greyText,
    fontFamily: FONTS.primary.bold,
    fontSize: font(12),
    lineHeight: font(16),
  },
});
