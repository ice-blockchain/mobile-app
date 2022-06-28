// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import React, {memo, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  children: ReactNode;
};

export const SectionCard = memo(({children}: Props) => {
  return (
    <View style={[styles.container, commonStyles.shadow]}>
      <View style={styles.body}>{children}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.white,
    marginTop: rem(21),
  },
  body: {
    borderRadius: rem(16),
    overflow: 'hidden',
  },
});
