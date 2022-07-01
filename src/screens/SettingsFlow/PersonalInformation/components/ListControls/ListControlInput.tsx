// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ListControlBase} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import React, {memo, useRef} from 'react';
import {StyleSheet, TextInputProps} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {font} from 'rn-units';

type Props = {
  label: string;
} & TextInputProps;

export const ListControlInput = memo(({label, ...inputProps}: Props) => {
  const inputRef = useRef<TextInput>(null);
  return (
    <TouchableOpacity onPress={() => inputRef.current?.focus()}>
      <ListControlBase label={label}>
        <TextInput style={styles.input} {...inputProps} ref={inputRef} />
      </ListControlBase>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  input: {
    color: COLORS.greyText,
    fontFamily: FONTS.primary.bold,
    fontSize: font(14),
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
});
