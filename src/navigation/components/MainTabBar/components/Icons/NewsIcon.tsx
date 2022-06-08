// SPDX-License-Identifier: BUSL-1.1

import {Badge} from '@components/Badge';
import {LampActiveIcon} from '@svg/LampActiveIcon';
import {LampInactiveIcon} from '@svg/LampInactiveIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  focused: boolean;
};

export const NewsIcon = ({focused}: Props) => {
  return (
    <View>
      {focused ? <LampActiveIcon /> : <LampInactiveIcon />}
      <Badge value={3} style={styles.badge} />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -7,
    right: -7,
  },
});
