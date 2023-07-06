// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  Icon: ReactNode;
  label: string;
};

export const SearchPlaceholder = ({Icon, label}: Props) => {
  return (
    <View style={styles.container}>
      {Icon}
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: rem(160),
  },
  labelText: {
    marginTop: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    ...font(14, 19, 'medium', 'secondary', 'center'),
  },
});
