// SPDX-License-Identifier: BUSL-1.1

import {Switch} from '@components/Switch';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export const AllNotifications = memo(({label, value, onValueChange}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText} numberOfLines={2}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        style={styles.switch}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(42),
  },
  labelText: {
    fontSize: font(12),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
    flex: 1,
  },
  switch: {
    marginRight: rem(28),
  },
});
