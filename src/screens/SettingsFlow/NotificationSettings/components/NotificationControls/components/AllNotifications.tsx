// SPDX-License-Identifier: ice License 1.0

import {Switch} from '@components/Switch';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export const AllNotifications = memo(({label, value, onValueChange}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {label}
      </Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}, propsAreEqual);

function propsAreEqual(prev: Props, next: Props) {
  return prev.value === next.value;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rem(12),
  },
  title: {
    ...font(16, 21, 'black', 'primaryDark'),
    paddingBottom: rem(4),
  },
});
